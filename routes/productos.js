const express = require('express');
const router = express.Router();
const {
    getAllProductos,
    createProducto
} = require('../controllers/productos');

// Rutas para productos
router.get('/', getAllProductos);
router.post('/', createProducto);

module.exports = router;