
/*________________________________ Realizado por: Cristhian Andres Burbano Mendoza ID:863101 ________________________________*/

const { Client } = require('pg');

const client = new Client({
    host: 'aws-0-us-east-1.pooler.supabase.com',
    port: 5432,
    user: 'postgres.jqhnvjffprivqlfatjej',
    password: '1234SupabaseBD',
    database: 'postgres',
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect((error) => {
    if (error) {
        console.log('Error conectando con la base de datos:', error);
        return;
    } else {
        console.log('Conectado con la base de datos de Supabase');
    }
});

module.exports = client;