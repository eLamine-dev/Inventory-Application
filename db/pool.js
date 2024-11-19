const { Pool } = require('pg');

// require('dotenv').config({
//    path: '../.env',
// });

const pool = new Pool({
   user: 'e-lamine',
   host: 'localhost',
   database: 'inventory_app',
   password: '123',
   port: 5432,
});

module.exports = pool;
