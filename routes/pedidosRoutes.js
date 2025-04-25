
/*________________________________ Realizado por: Cristhian Andres Burbano Mendoza ID:863101 ________________________________*/

const express = require('express');
const router = express.Router();
const {
    getAllPedidos,
    getPedidosByFecha,
    getVentasByRestaurante,
    getProductosByPedido,
    createPedido,
    updatePedido,
    deletePedido
} = require('../controllers/pedidos');

router.get('/', getAllPedidos);
router.get('/fecha/:fecha', getPedidosByFecha);
router.get('/ventas-restaurante', getVentasByRestaurante);
router.get('/:id_pedido/productos', getProductosByPedido);
router.post('/', createPedido);
router.put('/:id', updatePedido);
router.delete('/:id', deletePedido);

module.exports = router;