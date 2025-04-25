
/*________________________________ Realizado por: Cristhian Andres Burbano Mendoza ID:863101 ________________________________*/

const express = require('express');
const router = express.Router();
const {
    getAllEmpleados,
    getEmpleadosByRestaurante,
    getEmpleadosByRol,
    createEmpleado,
    updateEmpleado,
    deleteEmpleado
} = require('../controllers/empleados');

router.get('/', getAllEmpleados);
router.get('/restaurante/:id_rest', getEmpleadosByRestaurante);
router.get('/restaurante/:id_rest/rol/:rol', getEmpleadosByRol);
router.post('/', createEmpleado);
router.put('/:id', updateEmpleado);
router.delete('/:id', deleteEmpleado);

module.exports = router;