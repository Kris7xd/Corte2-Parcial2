const pool = require('../bd/db');

// Obtener todos los productos
const getAllProductos = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM producto');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
};

// Crear un nuevo producto
const createProducto = async (req, res) => {
    const { nombre, precio } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO producto (nombre, precio) VALUES ($1, $2) RETURNING *',
            [nombre, precio]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al crear producto' });
    }
};

module.exports = {
    getAllProductos,
    createProducto
};