const express = require('express');
const router = express.Router();
const {
    getAllPedidos,
    getPedidosByRestaurante,
    createPedido
} = require('../controllers/pedidos');

// Rutas para pedidos
router.get('/', getAllPedidos);
router.get('/restaurante/:id', getPedidosByRestaurante);
router.post('/', createPedido);

module.exports = router;