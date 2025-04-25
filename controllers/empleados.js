
/*________________________________ Realizado por: Cristhian Andres Burbano Mendoza ID:863101 ________________________________*/

const client = require('../bd');

// Obtener todos los empleados
async function getAllEmpleados(req, res) {
    try {
        const result = await client.query('SELECT * FROM Empleado');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Obtener empleados por restaurante
async function getEmpleadosByRestaurante(req, res) {
    const { id_rest } = req.params;
    try {
        const result = await client.query('SELECT * FROM Empleado WHERE id_rest = $1', [id_rest]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Obtener empleados por rol en un restaurante
async function getEmpleadosByRol(req, res) {
    const { id_rest, rol } = req.params;
    try {
        const result = await client.query(
            'SELECT * FROM Empleado WHERE id_rest = $1 AND rol = $2',
            [id_rest, rol]
        );
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Crear un nuevo empleado
async function createEmpleado(req, res) {
    const { nombre, rol, id_rest } = req.body;
    try {
        const result = await client.query(
            'INSERT INTO Empleado (nombre, rol, id_rest) VALUES ($1, $2, $3) RETURNING *',
            [nombre, rol, id_rest]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Actualizar un empleado
async function updateEmpleado(req, res) {
    const { id } = req.params;
    const { nombre, rol, id_rest } = req.body;
    try {
        const result = await client.query(
            'UPDATE Empleado SET nombre = $1, rol = $2, id_rest = $3 WHERE id_empleado = $4 RETURNING *',
            [nombre, rol, id_rest, id]
        );
        if (result.rowCount === 0) {
            res.status(404).json({ message: 'Empleado no encontrado' });
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Eliminar un empleado
async function deleteEmpleado(req, res) {
    const { id } = req.params;
    try {
        const result = await client.query('DELETE FROM Empleado WHERE id_empleado = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            res.status(404).json({ message: 'Empleado no encontrado' });
        } else {
            res.status(200).json({ message: 'Empleado eliminado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllEmpleados,
    getEmpleadosByRestaurante,
    getEmpleadosByRol,
    createEmpleado,
    updateEmpleado,
    deleteEmpleado
};