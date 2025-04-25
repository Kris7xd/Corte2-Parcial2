
/*________________________________ Realizado por: Cristhian Andres Burbano Mendoza ID:863101 ________________________________*/

const client = require('../bd');

// Obtener todos los restaurantes
async function getAllRestaurantes(req, res) {
    try {
        const result = await client.query('SELECT * FROM Restaurante');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Obtener un restaurante por ID
async function getRestauranteById(req, res) {
    const { id } = req.params;
    try {
        const result = await client.query('SELECT * FROM Restaurante WHERE id_rest = $1', [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Restaurante no encontrado' });
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Crear un nuevo restaurante
async function createRestaurante(req, res) {
    const { nombre, ciudad, direccion, fecha_apertura } = req.body;
    try {
        const result = await client.query(
            'INSERT INTO Restaurante (nombre, ciudad, direccion, fecha_apertura) VALUES ($1, $2, $3, $4) RETURNING *',
            [nombre, ciudad, direccion, fecha_apertura]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Actualizar un restaurante
async function updateRestaurante(req, res) {
    const { id } = req.params;
    const { nombre, ciudad, direccion, fecha_apertura } = req.body;
    try {
        const result = await client.query(
            'UPDATE Restaurante SET nombre = $1, ciudad = $2, direccion = $3, fecha_apertura = $4 WHERE id_rest = $5 RETURNING *',
            [nombre, ciudad, direccion, fecha_apertura, id]
        );
        if (result.rowCount === 0) {
            res.status(404).json({ message: 'Restaurante no encontrado' });
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Eliminar un restaurante
async function deleteRestaurante(req, res) {
    const { id } = req.params;
    try {
        const result = await client.query('DELETE FROM Restaurante WHERE id_rest = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            res.status(404).json({ message: 'Restaurante no encontrado' });
        } else {
            res.status(200).json({ message: 'Restaurante eliminado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllRestaurantes,
    getRestauranteById,
    createRestaurante,
    updateRestaurante,
    deleteRestaurante
};