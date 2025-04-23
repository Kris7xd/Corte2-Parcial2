
//_______________________ Por: Cristhian Andres Burbano Mendoza id:863101 ________________________________

require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Importar rutas
const restaurantesRouter = require('./routes/restaurantes');
const empleadosRouter = require('./routes/empleados');
const productosRouter = require('./routes/productos');
const pedidosRouter = require('./routes/pedidos');
const detallePedidosRouter = require('./routes/detallePedidos');

const app = express();
const port = process.env.PORT || 3000;

// Configuración de middleware
app.use(cors());
app.use(express.json());

// Rutas base
app.use('/restaurantes', restaurantesRouter);
app.use('/empleados', empleadosRouter);
app.use('/productos', productosRouter);
app.use('/pedidos', pedidosRouter);
app.use('/detalles', detallePedidosRouter);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API de Cadena de Comidas Rápidas');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});