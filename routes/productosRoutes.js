
/*________________________________ Realizado por: Cristhian Andres Burbano Mendoza ID:863101 ________________________________*/

const express = require('express');
const router = express.Router();
const {
    getAllProductos,
    getProductosMasVendidos,
    createProducto,
    updateProducto,
    deleteProducto
} = require('../controllers/productos');

router.get('/', getAllProductos);
router.get('/mas-vendidos/:unidades', getProductosMasVendidos);
router.post('/', createProducto);
router.put('/:id', updateProducto);
router.delete('/:id', deleteProducto);

module.exports = router;