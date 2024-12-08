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

exports.editCategory = (id, name, slug) =>
   query('UPDATE categories SET name = $1, slug = $2 WHERE id = $3', [
      name,
      slug,
      id,
   ]);

exports.confirmCategoryDeletionQueries = {
   getItemsByCategory: (id) =>
      query('SELECT * FROM items WHERE category_id = $1', [id]),
   getOtherCategories: (id) =>
      query('SELECT * FROM categories WHERE id != $1', [id]),
};

exports.handleCategoryDeletionQueries = {
   deleteItemsByCategory: (id) =>
      query('DELETE FROM items WHERE category_id = $1', [id]),
   reassignItemsCategory: (newId, oldId) =>
      query('UPDATE items SET category_id = $1 WHERE category_id = $2', [
         newId,
         oldId,
      ]),
   nullifyItemsCategory: (id) =>
      query('UPDATE items SET category_id = NULL WHERE category_id = $1', [id]),
   deleteCategory: (id) => query('DELETE FROM categories WHERE id = $1', [id]),
};

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

exports.editItem = (id, name, price, stock, categoryId, manufacturerId, slug) =>
   query(
      'UPDATE items SET name = $1, price = $2, stock = $3, category_id = $4, manufacturer_id = $5, slug = $6 WHERE id = $7',
      [name, price, stock, categoryId, manufacturerId, slug, id]
   );

exports.deleteItem = (id) => query('DELETE FROM items WHERE id = $1', [id]);

exports.updateStock = async (itemId, action, quantity) => {
   const currentStock = await query('SELECT stock FROM items WHERE id = $1', [
      itemId,
   ]);
   const stock = currentStock[0].stock;
   const newStock =
      action === 'add' ? stock + quantity : Math.max(stock - quantity, 0);
   return query('UPDATE items SET stock = $1 WHERE id = $2', [
      newStock,
      itemId,
   ]);
};

// Manufacturers
exports.getAllManufacturers = () => query('SELECT * FROM manufacturers');
exports.createManufacturer = (name) =>
   query('INSERT INTO manufacturers (name) VALUES ($1) RETURNING *', [name]);

exports.editManufacturer = (id, name) =>
   query('UPDATE manufacturers SET name = $1 WHERE id = $2', [name, id]);

exports.deleteManufacturer = (id) =>
   query('DELETE FROM manufacturers WHERE id = $1', [id]);
