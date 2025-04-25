
/*________________________________ Realizado por: Cristhian Andres Burbano Mendoza ID:863101 ________________________________*/

const express = require('express');
const router = express.Router();
const {
    getAllRestaurantes,
    getRestauranteById,
    createRestaurante,
    updateRestaurante,
    deleteRestaurante
} = require('../controllers/restaurantes');

router.get('/', getAllRestaurantes);
router.get('/:id', getRestauranteById);
router.post('/', createRestaurante);
router.put('/:id', updateRestaurante);
router.delete('/:id', deleteRestaurante);

module.exports = router;