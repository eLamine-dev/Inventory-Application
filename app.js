const express = require('express');
const pool = require('./db/pool');

const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.locals.pool = pool;

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
   console.log(`Server running on http://localhost:${PORT}`)
);
