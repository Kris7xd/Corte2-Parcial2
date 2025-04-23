const express = require('express');
const router = express.Router();
const {
    getDetallesByPedido
} = require('../controllers/detallePedidos');

// Ruta para detalles de pedido
router.get('/pedido/:id', getDetallesByPedido);

module.exports = router;