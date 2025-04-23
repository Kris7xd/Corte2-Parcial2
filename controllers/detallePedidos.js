const pool = require('../bd/db');

// Obtener detalles de un pedido
const getDetallesByPedido = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            `SELECT dp.id_detalle, p.nombre as producto, dp.cantidad, dp.subtotal, p.precio 
             FROM detallepedido dp
             JOIN producto p ON dp.id_prod = p.id_prod
             WHERE dp.id_pedido = $1`,
            [id]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener detalles del pedido' });
    }
};

module.exports = {
    getDetallesByPedido
};