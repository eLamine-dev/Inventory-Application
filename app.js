const express = require('express');
const pool = require('./db/pool');
const categoryRoutes = require('./routes/categoryRoutes');
const manufacturerRoutes = require('./routes/manufacturerRoutes');
const itemRoutes = require('./routes/itemRoutes');

const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.locals.pool = pool;

// Routes
app.use('/categories', categoryRoutes);
app.use('/manufacturers', manufacturerRoutes);
app.use('/items', itemRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
   console.log(`Server running on http://localhost:${PORT}`)
);
