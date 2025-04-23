const express = require('express');
const router = express.Router();
const {
    getAllEmpleados,
    getEmpleadosByRestaurante,
    createEmpleado
} = require('../controllers/empleados');

// Rutas para empleados
router.get('/', getAllEmpleados);
router.get('/restaurante/:id', getEmpleadosByRestaurante);
router.post('/', createEmpleado);

module.exports = router;