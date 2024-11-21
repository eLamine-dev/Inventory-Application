const express = require('express');
const methodOverride = require('method-override');
const pool = require('./db/pool');
const categoryRoutes = require('./routes/categoryRoutes');
const manufacturerRoutes = require('./routes/manufacturerRoutes');
const itemRoutes = require('./routes/itemRoutes');
const dashboardRoute = require('./routes/dashboardRoute');
var path = require('path');
const session = require('express-session');

const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.locals.pool = pool;

app.use(
   session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 24 * 60 * 60 * 1000 },
   })
);

app.use('/', dashboardRoute);
app.use('/categories', categoryRoutes);
app.use('/manufacturers', manufacturerRoutes);
app.use('/items', itemRoutes);

const PORT = 3000;
app.listen(PORT, () => {
   console.log(`Server running on http://localhost:${PORT}`);
});
