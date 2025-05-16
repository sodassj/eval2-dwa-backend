const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const cors = require("cors");
const { Medicamento, OrdenCompra, OrdenVenta, Usuario } = require("./models");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = process.env.SECRET_KEY || "secretkey";

// Middleware de autenticación
const authenticateJWT = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(403).send("Acceso denegado");

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).send("Token inválido");
        req.user = user;
        next();
    });
};

// Middleware de autorización por rol
const authorizeRoles = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.rol)) {
            return res.status(403).send("No tienes permisos suficientes");
        }
        next();
    };
};

// Middleware para validación de campos no nulos
const validateFields = (requiredFields) => {
    return (req, res, next) => {
        const missingFields = requiredFields.filter((field) =>
            !req.body[field]
        );
        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Faltan los siguientes campos: ${
                    missingFields.join(", ")
                }`,
            });
        }
        next();
    };
};

// Registro
app.post("/register", async (req, res) => {
    const { nombre, email, password, rol } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await Usuario.create({
            nombre,
            email,
            password: hashedPassword,
            rol: rol || "usuario",
        });

        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Usuario.findOne({ where: { email } });
        if (!user) return res.status(400).send("Usuario no encontrado");

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).send("Contraseña incorrecta");
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, rol: user.rol },
            SECRET_KEY,
            { expiresIn: "1h" },
        );

        res.json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Logout (cliente elimina token)
app.post("/logout", authenticateJWT, (req, res) => {
    res.send("Sesión cerrada");
});

//////////////////////////
// CRUD Medicamentos
//////////////////////////

app.get("/medicamentos", authenticateJWT, async (req, res) => {
    try {
        const medicamentos = await Medicamento.findAll();
        res.json(medicamentos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post(
    "/medicamentos",
    authenticateJWT,
    authorizeRoles(["admin"]),
    validateFields(["descripcionMed", "precioVentaUni", "stock"]), // Validación de campos obligatorios
    async (req, res) => {
        const { descripcionMed, precioVentaUni, stock } = req.body;
        try {
            const medicamento = await Medicamento.create({
                descripcionMed,
                precioVentaUni,
                stock,
            });
            res.status(201).json(medicamento);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
);

app.put(
    "/medicamentos/:id",
    authenticateJWT,
    authorizeRoles(["admin"]),
    validateFields(["descripcionMed", "precioVentaUni", "stock"]), // Validación de campos obligatorios
    async (req, res) => {
        const { id } = req.params;
        const { descripcionMed, precioVentaUni, stock } = req.body;

        try {
            const medicamento = await Medicamento.findByPk(id);
            if (!medicamento) {
                return res.status(404).send("Medicamento no encontrado");
            }

            medicamento.descripcionMed = descripcionMed ||
                medicamento.descripcionMed;
            medicamento.precioVentaUni = precioVentaUni ||
                medicamento.precioVentaUni;
            medicamento.stock = stock || medicamento.stock;

            await medicamento.save();
            res.json(medicamento);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
);

app.delete(
    "/medicamentos/:id",
    authenticateJWT,
    authorizeRoles(["admin"]),
    async (req, res) => {
        const { id } = req.params;
        try {
            const medicamento = await Medicamento.findByPk(id);
            if (!medicamento) return res.status(404).send("No encontrado");

            await medicamento.destroy();
            res.send("Eliminado");
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
);

//////////////////////////
// CRUD Usuarios
//////////////////////////

app.get(
    "/usuarios",
    authenticateJWT,
    authorizeRoles(["admin"]),
    async (req, res) => {
        try {
            const usuarios = await Usuario.findAll();
            res.json(usuarios);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
);

app.put(
    "/usuarios/:id",
    authenticateJWT,
    authorizeRoles(["admin"]),
    validateFields(["nombre", "email", "rol"]), // Validación de campos obligatorios
    async (req, res) => {
        const { id } = req.params;
        const { nombre, email, rol } = req.body;

        try {
            const usuario = await Usuario.findByPk(id);
            if (!usuario) return res.status(404).send("Usuario no encontrado");

            usuario.nombre = nombre || usuario.nombre;
            usuario.email = email || usuario.email;
            usuario.rol = rol || usuario.rol;

            await usuario.save();
            res.json(usuario);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
);

app.delete(
    "/usuarios/:id",
    authenticateJWT,
    authorizeRoles(["admin"]),
    async (req, res) => {
        const { id } = req.params;
        try {
            const usuario = await Usuario.findByPk(id);
            if (!usuario) return res.status(404).send("Usuario no encontrado");

            await usuario.destroy();
            res.send("Usuario eliminado");
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
);

//////////////////////////
// CRUD OrdenCompra
//////////////////////////

app.get(
    "/ordencompras",
    authenticateJWT,
    authorizeRoles(["admin"]),
    async (req, res) => {
        try {
            const ordenes = await OrdenCompra.findAll();
            res.json(ordenes);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
);

app.post(
    "/ordencompras",
    authenticateJWT,
    authorizeRoles(["admin"]),
    validateFields([
        "fechaEmision",
        "Situacion",
        "Total",
        "CodLab",
        "NrofacturaProv",
    ]), // Validación de campos obligatorios
    async (req, res) => {
        const { fechaEmision, Situacion, Total, CodLab, NrofacturaProv } =
            req.body;
        try {
            const orden = await OrdenCompra.create({
                fechaEmision,
                Situacion,
                Total,
                CodLab,
                NrofacturaProv,
            });
            res.status(201).json(orden);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
);

app.put(
    "/ordencompras/:id",
    authenticateJWT,
    authorizeRoles(["admin"]),
    validateFields([
        "fechaEmision",
        "Situacion",
        "Total",
        "CodLab",
        "NrofacturaProv",
    ]), // Validación de campos obligatorios
    async (req, res) => {
        const { id } = req.params;
        const { fechaEmision, Situacion, Total, CodLab, NrofacturaProv } =
            req.body;

        try {
            const orden = await OrdenCompra.findByPk(id);
            if (!orden) return res.status(404).send("Orden no encontrada");

            orden.fechaEmision = fechaEmision || orden.fechaEmision;
            orden.Situacion = Situacion || orden.Situacion;
            orden.Total = Total || orden.Total;
            orden.CodLab = CodLab || orden.CodLab;
            orden.NrofacturaProv = NrofacturaProv || orden.NrofacturaProv;

            await orden.save();
            res.json(orden);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
);

app.delete(
    "/ordencompras/:id",
    authenticateJWT,
    authorizeRoles(["admin"]),
    async (req, res) => {
        const { id } = req.params;
        try {
            const orden = await OrdenCompra.findByPk(id);
            if (!orden) return res.status(404).send("No encontrado");

            await orden.destroy();
            res.send("Orden eliminada");
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
);

//////////////////////////
// CRUD OrdenVenta
//////////////////////////

app.get(
    "/ordenventas",
    authenticateJWT,
    authorizeRoles(["admin", "usuario"]),
    async (req, res) => {
        try {
            const ordenes = await OrdenVenta.findAll();
            res.json(ordenes);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
);

app.post(
    "/ordenventas",
    authenticateJWT,
    authorizeRoles(["admin"]),
    validateFields(["fechaEmision", "Motivo", "Situacion"]), // Validación de campos obligatorios
    async (req, res) => {
        const { fechaEmision, Motivo, Situacion } = req.body;
        try {
            const orden = await OrdenVenta.create({
                fechaEmision,
                Motivo,
                Situacion,
            });
            res.status(201).json(orden);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
);

app.put(
    "/ordenventas/:id",
    authenticateJWT,
    authorizeRoles(["admin"]),
    validateFields(["fechaEmision", "Motivo", "Situacion"]), // Validación de campos obligatorios
    async (req, res) => {
        const { id } = req.params;
        const { fechaEmision, Motivo, Situacion } = req.body;

        try {
            const orden = await OrdenVenta.findByPk(id);
            if (!orden) return res.status(404).send("Orden no encontrada");

            orden.fechaEmision = fechaEmision || orden.fechaEmision;
            orden.Motivo = Motivo || orden.Motivo;
            orden.Situacion = Situacion || orden.Situacion;

            await orden.save();
            res.json(orden);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
);

app.delete(
    "/ordenventas/:id",
    authenticateJWT,
    authorizeRoles(["admin"]),
    async (req, res) => {
        const { id } = req.params;
        try {
            const orden = await OrdenVenta.findByPk(id);
            if (!orden) return res.status(404).send("No encontrado");

            await orden.destroy();
            res.send("Orden eliminada");
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
);

//////////////////////////
// Puerto
//////////////////////////

app.listen(3000, () => {
    console.log("Servidor corriend");
});
