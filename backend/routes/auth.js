const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const verificarToken = require('../middleware/auth');
const router = express.Router();

// 2. POST /api/auth/registro - Crear cuenta nueva en MySQL
router.post('/registro', async (req, res) => {
    try {
        const { nombre, email, password, rol, departamento, municipio } = req.body;

        // Verificar si el email ya existe en la tabla usuarios
        const existe = await Usuario.findOne({ where: { email } });
        if (existe) {
            return res.status(400).json({ error: 'El email ya está registrado' });
        }

        // Encriptar la contraseña
        const hash = await bcrypt.hash(password, 10);

        // Insertar registro en MySQL
        const usuario = await Usuario.create({
            nombre,
            email,
            password: hash,
            rol,
            departamento,
            municipio
        });

        res.status(201).json({
            mensaje: 'Usuario creado correctamente',
            id: usuario.id // Ahora devuelve el ID numérico autoincremental
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 3. POST /api/auth/login - Autenticar con MySQL y emitir JWT
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar usuario por email en la base relacional
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(401).json({ error: 'Email o contraseña incorrectos' });
        }

        // Comprobar la contraseña con el hash guardado en MySQL
        const valida = await bcrypt.compare(password, usuario.password);
        if (!valida) {
            return res.status(401).json({ error: 'Email o contraseña incorrectos' });
        }

        // Crear el token JWT (Guardamos el ID numérico entero en el payload)
        const token = jwt.sign(
            {
                id: usuario.id,
                email: usuario.email,
                rol: usuario.rol
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Responder al frontend exactamente con la misma estructura que tenías
        res.json({
            token,
            nombre: usuario.nombre,
            rol: usuario.rol
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. GET /api/auth/perfil - Obtener los datos del perfil activo
router.get('/perfil', verificarToken, async (req, res) => {
    try {
        // req.usuario.id viene decodificado del JWT
        // attributes: { exclude: ['password'] } funciona igual que el select('-password') de Mongo
        const usuario = await Usuario.findByPk(req.usuario.id, {
            attributes: { exclude: ['password'] }
        });
        
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(usuario);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
