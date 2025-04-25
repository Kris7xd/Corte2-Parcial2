
/*________________________________ Realizado por: Cristhian Andres Burbano Mendoza ID:863101 ________________________________*/

const client = require('../bd');

// Obtener todos los pedidos
async function getAllPedidos(req, res) {
    try {
        const result = await client.query('SELECT * FROM Pedido');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Obtener pedidos por fecha
async function getPedidosByFecha(req, res) {
    const { fecha } = req.params;
    try {
        const result = await client.query('SELECT * FROM Pedido WHERE fecha = $1', [fecha]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Obtener total de ventas por restaurante
async function getVentasByRestaurante(req, res) {
    try {
        const result = await client.query(
            `SELECT r.id_rest, r.nombre, SUM(p.total) as total_ventas
             FROM Restaurante r
             JOIN Pedido p ON r.id_rest = p.id_rest
             GROUP BY r.id_rest, r.nombre`
        );
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Obtener productos de un pedido específico
async function getProductosByPedido(req, res) {
    const { id_pedido } = req.params;
    try {
        const result = await client.query(
            `SELECT p.id_prod, p.nombre, dp.cantidad, dp.subtotal
             FROM Producto p
             JOIN DetallePedido dp ON p.id_prod = dp.id_prod
             WHERE dp.id_pedido = $1`,
            [id_pedido]
        );
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Crear un nuevo pedido
async function createPedido(req, res) {
    const { fecha, id_rest, total } = req.body;
    try {
        const result = await client.query(
            'INSERT INTO Pedido (fecha, id_rest, total) VALUES ($1, $2, $3) RETURNING *',
            [fecha, id_rest, total]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Actualizar un pedido
async function updatePedido(req, res) {
    const { id } = req.params;
    const { fecha, id_rest, total } = req.body;
    try {
        const result = await client.query(
            'UPDATE Pedido SET fecha = $1, id_rest = $2, total = $3 WHERE id_pedido = $4 RETURNING *',
            [fecha, id_rest, total, id]
        );
        if (result.rowCount === 0) {
            res.status(404).json({ message: 'Pedido no encontrado' });
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Eliminar un pedido
async function deletePedido(req, res) {
    const { id } = req.params;
    try {
        const result = await client.query('DELETE FROM Pedido WHERE id_pedido = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            res.status(404).json({ message: 'Pedido no encontrado' });
        } else {
            res.status(200).json({ message: 'Pedido eliminado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllPedidos,
    getPedidosByFecha,
    getVentasByRestaurante,
    getProductosByPedido,
    createPedido,
    updatePedido,
    deletePedido
};