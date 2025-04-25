
/*________________________________ Realizado por: Cristhian Andres Burbano Mendoza ID:863101 ________________________________*/

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Importar rutas
const restaurantesRoutes = require('./routes/restaurantesRoutes');
const empleadosRoutes = require('./routes/empleadosRoutes');
const productosRoutes = require('./routes/productosRoutes');
const pedidosRoutes = require('./routes/pedidosRoutes');
const detallesPedidoRoutes = require('./routes/detallesPedidoRoutes');

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/restaurantes', restaurantesRoutes);
app.use('/api/empleados', empleadosRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/pedidos', pedidosRoutes);
app.use('/api/detalles-pedido', detallesPedidoRoutes);

// Ruta de prueba
app.get('/api', (req, res) => {
    res.send('API de cadena de comidas rápidas funcionando');
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});