const pool = require('./pool');

// Generic Query
const query = async (text, params) => {
   const res = await pool.query(text, params);
   return res.rows;
};

// Categories
exports.getAllCategories = () => query('SELECT * FROM categories');
exports.createCategory = (name, slug) =>
   query('INSERT INTO categories (name, slug) VALUES ($1, $2) RETURNING *', [
      name,
      slug,
   ]);
exports.deleteCategory = (id) =>
   query('DELETE FROM categories WHERE id = $1 RETURNING *', [id]);

// Items
exports.getAllItems = () =>
   query(
      `SELECT items.*, categories.name AS category_name, manufacturers.name AS manufacturer_name 
       FROM items
       LEFT JOIN categories ON items.category_id = categories.id
       LEFT JOIN manufacturers ON items.manufacturer_id = manufacturers.id`
   );
exports.getItemsByCategory = (categoryId) =>
   query(
      `SELECT items.*, categories.name AS category_name, manufacturers.name AS manufacturer_name 
       FROM items
       LEFT JOIN categories ON items.category_id = categories.id
       LEFT JOIN manufacturers ON items.manufacturer_id = manufacturers.id
       WHERE items.category_id = $1`,
      [categoryId]
   );
exports.getItemById = (id) =>
   query(
      `SELECT items.*, categories.name AS category_name, manufacturers.name AS manufacturer_name 
       FROM items
       LEFT JOIN categories ON items.category_id = categories.id
       LEFT JOIN manufacturers ON items.manufacturer_id = manufacturers.id
       WHERE items.id = $1`,
      [id]
   );
exports.createItem = (
   name,
   price,
   specifications,
   categoryId,
   manufacturerId,
   slug
) =>
   query(
      `INSERT INTO items (name, price, specifications, category_id, manufacturer_id, slug)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, price, specifications, categoryId, manufacturerId, slug]
   );

// Manufacturers
exports.getAllManufacturers = () => query('SELECT * FROM manufacturers');
exports.createManufacturer = (name) =>
   query('INSERT INTO manufacturers (name) VALUES ($1) RETURNING *', [name]);
