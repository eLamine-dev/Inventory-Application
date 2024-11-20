const pool = require('./pool');

// Category Queries
exports.getAllCategories = async () => {
   const res = await pool.query('SELECT * FROM categories');
   return res.rows;
};

exports.createCategory = async (name, slug) => {
   const res = await pool.query(
      'INSERT INTO categories (name, slug) VALUES ($1, $2) RETURNING *',
      [name, slug]
   );
   return res.rows[0];
};

exports.deleteCategory = async (id) => {
   const res = await pool.query(
      'DELETE FROM categories WHERE id = $1 RETURNING *',
      [id]
   );
   return res.rows[0];
};

// Manufacturer Queries
exports.getAllManufacturers = async () => {
   const res = await pool.query('SELECT * FROM manufacturers');
   return res.rows;
};

exports.createManufacturer = async (name) => {
   const res = await pool.query(
      'INSERT INTO manufacturers (name) VALUES ($1) RETURNING *',
      [name]
   );
   return res.rows[0];
};

// Item Queries
exports.getAllItems = async () => {
   const res = await pool.query(
      `SELECT items.*, categories.name AS category_name, manufacturers.name AS manufacturer_name 
     FROM items
     LEFT JOIN categories ON items.category_id = categories.id
     LEFT JOIN manufacturers ON items.manufacturer_id = manufacturers.id`
   );
   return res.rows;
};

exports.createItem = async (
   name,
   price,
   specifications,
   categoryId,
   manufacturerId,
   slug
) => {
   const res = await pool.query(
      `INSERT INTO items (name, price, specifications, category_id, manufacturer_id, slug)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, price, specifications, categoryId, manufacturerId, slug]
   );
   return res.rows[0];
};
