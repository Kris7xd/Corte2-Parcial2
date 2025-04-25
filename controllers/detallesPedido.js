
/*________________________________ Realizado por: Cristhian Andres Burbano Mendoza ID:863101 ________________________________*/

const client = require('../bd');

// Crear un detalle de pedido
async function createDetallePedido(req, res) {
    const { id_pedido, id_prod, cantidad, subtotal } = req.body;
    try {
        const result = await client.query(
            'INSERT INTO DetallePedido (id_pedido, id_prod, cantidad, subtotal) VALUES ($1, $2, $3, $4) RETURNING *',
            [id_pedido, id_prod, cantidad, subtotal]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Actualizar un detalle de pedido
async function updateDetallePedido(req, res) {
    const { id } = req.params;
    const { id_pedido, id_prod, cantidad, subtotal } = req.body;
    try {
        const result = await client.query(
            'UPDATE DetallePedido SET id_pedido = $1, id_prod = $2, cantidad = $3, subtotal = $4 WHERE id_detalle = $5 RETURNING *',
            [id_pedido, id_prod, cantidad, subtotal, id]
        );
        if (result.rowCount === 0) {
            res.status(404).json({ message: 'Detalle de pedido no encontrado' });
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Eliminar un detalle de pedido
async function deleteDetallePedido(req, res) {
    const { id } = req.params;
    try {
        const result = await client.query('DELETE FROM DetallePedido WHERE id_detalle = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            res.status(404).json({ message: 'Detalle de pedido no encontrado' });
        } else {
            res.status(200).json({ message: 'Detalle de pedido eliminado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createDetallePedido,
    updateDetallePedido,
    deleteDetallePedido
};