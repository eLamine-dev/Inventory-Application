const pool = require('./pool');

const getCategories = async () => {
   const res = await pool.query(`SELECT * FROM categories`);
   return res.rows;
};

const createCategory = async (name, slug) => {
   const res = await pool.query(
      `INSERT INTO categories (name, slug) VALUES ($1, $2) RETURNING *`,
      [name, slug]
   );
   return res.rows[0];
};

// Manufacturer Queries
const getManufacturers = async () => {
   const res = await pool.query(`SELECT * FROM manufacturers`);
   return res.rows;
};

const createManufacturer = async (name) => {
   const res = await pool.query(
      `INSERT INTO manufacturers (name) VALUES ($1) RETURNING *`,
      [name]
   );
   return res.rows[0];
};

// Item Queries
const getItems = async () => {
   const res = await pool.query(`SELECT * FROM items`);
   return res.rows;
};

const createItem = async (
   name,
   price,
   attributes,
   categoryId,
   manufacturerId
) => {
   const res = await pool.query(
      `INSERT INTO items (name, price, specifications, category_id, manufacturer_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, price, attributes, categoryId, manufacturerId]
   );
   return res.rows[0];
};

module.exports = {
   getCategories,
   createCategory,
   getManufacturers,
   createManufacturer,
   getItems,
   createItem,
};
