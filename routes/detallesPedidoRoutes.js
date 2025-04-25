
/*________________________________ Realizado por: Cristhian Andres Burbano Mendoza ID:863101 ________________________________*/

const express = require('express');
const router = express.Router();
const {
    createDetallePedido,
    updateDetallePedido,
    deleteDetallePedido
} = require('../controllers/detallesPedido');

router.post('/', createDetallePedido);
router.put('/:id', updateDetallePedido);
router.delete('/:id', deleteDetallePedido);

module.exports = router;