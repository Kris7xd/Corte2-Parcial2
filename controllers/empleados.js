const pool = require('../bd/db');

// Obtener todos los empleados
const getAllEmpleados = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM empleado');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener empleados' });
    }
};

// Obtener empleados por restaurante
const getEmpleadosByRestaurante = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM empleado WHERE id_rest = $1', [id]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener empleados del restaurante' });
    }
};

// Crear un nuevo empleado
const createEmpleado = async (req, res) => {
    const { nombre, rol, id_rest } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO empleado (nombre, rol, id_rest) VALUES ($1, $2, $3) RETURNING *',
            [nombre, rol, id_rest]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al crear empleado' });
    }
};

module.exports = {
    getAllEmpleados,
    getEmpleadosByRestaurante,
    createEmpleado
};