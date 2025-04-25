
/*________________________________ Realizado por: Cristhian Andres Burbano Mendoza ID:863101 ________________________________*/

const client = require('../bd');

// Obtener todos los productos
async function getAllProductos(req, res) {
    try {
        const result = await client.query('SELECT * FROM Producto');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Obtener productos más vendidos (más de X unidades)
async function getProductosMasVendidos(req, res) {
    const { unidades } = req.params;
    try {
        const result = await client.query(
            `SELECT p.id_prod, p.nombre, SUM(dp.cantidad) as total_vendido 
             FROM Producto p
             JOIN DetallePedido dp ON p.id_prod = dp.id_prod
             GROUP BY p.id_prod, p.nombre
             HAVING SUM(dp.cantidad) > $1`,
            [unidades]
        );
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Crear un nuevo producto
async function createProducto(req, res) {
    const { nombre, precio } = req.body;
    try {
        const result = await client.query(
            'INSERT INTO Producto (nombre, precio) VALUES ($1, $2) RETURNING *',
            [nombre, precio]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Actualizar un producto
async function updateProducto(req, res) {
    const { id } = req.params;
    const { nombre, precio } = req.body;
    try {
        const result = await client.query(
            'UPDATE Producto SET nombre = $1, precio = $2 WHERE id_prod = $3 RETURNING *',
            [nombre, precio, id]
        );
        if (result.rowCount === 0) {
            res.status(404).json({ message: 'Producto no encontrado' });
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Eliminar un producto
async function deleteProducto(req, res) {
    const { id } = req.params;
    try {
        const result = await client.query('DELETE FROM Producto WHERE id_prod = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            res.status(404).json({ message: 'Producto no encontrado' });
        } else {
            res.status(200).json({ message: 'Producto eliminado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllProductos,
    getProductosMasVendidos,
    createProducto,
    updateProducto,
    deleteProducto
};