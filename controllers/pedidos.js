const pool = require('../bd/db');

// Obtener todos los pedidos
const getAllPedidos = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM pedido');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener pedidos' });
    }
};

// Obtener pedidos por restaurante
const getPedidosByRestaurante = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM pedido WHERE id_rest = $1', [id]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener pedidos del restaurante' });
    }
};

// Crear un nuevo pedido
const createPedido = async (req, res) => {
    const { fecha, id_rest, total, productos } = req.body;
    
    try {
        await pool.query('BEGIN');
        
        const pedidoResult = await pool.query(
            'INSERT INTO pedido (fecha, id_rest, total) VALUES ($1, $2, $3) RETURNING id_pedido',
            [fecha, id_rest, total]
        );
        
        const id_pedido = pedidoResult.rows[0].id_pedido;
        
        for (const producto of productos) {
            await pool.query(
                'INSERT INTO detallepedido (id_pedido, id_prod, cantidad, subtotal) VALUES ($1, $2, $3, $4)',
                [id_pedido, producto.id_prod, producto.cantidad, producto.subtotal]
            );
        }
        
        await pool.query('COMMIT');
        
        res.status(201).json({ id_pedido, message: 'Pedido creado correctamente' });
    } catch (err) {
        await pool.query('ROLLBACK');
        console.error(err);
        res.status(500).json({ error: 'Error al crear pedido' });
    }
};

module.exports = {
    getAllPedidos,
    getPedidosByRestaurante,
    createPedido
};