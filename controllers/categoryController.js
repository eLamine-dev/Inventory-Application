const {
   getCategories,
   createCategory,
   deleteCategory,
} = require('../db/queries');

exports.getCategories = async (req, res) => {
   try {
      const categories = await getCategories();
      req.categories = categories.rows;
      next();
   } catch (err) {
      console.error('Error fetching categories:', err.message);
      res.status(500).send('Internal Server Error');
   }
};

exports.addCategory = async (req, res) => {
   const { name, slug } = req.body;
   await createCategory(name, slug);
   res.redirect('/');
};

exports.deleteCategory = async (req, res) => {
   const { id } = req.params;
   await deleteCategory(id);
   res.redirect('/');
};

exports.getCategories = async (req, res, next) => {};

exports.editCategory = async (req, res) => {
   const { id } = req.params;
   const { name, slug } = req.body;
   await pool.query(
      'UPDATE categories SET name = $1, slug = $2 WHERE id = $3',
      [name, slug, id]
   );
   res.redirect('/');
};

const pool = require('../db/pool');

exports.confirmCategoryDeletion = async (req, res) => {
   const { id } = req.params;

   const items = await pool.query(
      'SELECT * FROM items WHERE category_id = $1',
      [id]
   );
   const categories = await pool.query(
      'SELECT * FROM categories WHERE id != $1',
      [id]
   );

   res.render('categories/confirmDeletion', {
      categoryId: id,
      items: items.rows,
      categories: categories.rows,
   });
};

exports.handleCategoryDeletion = async (req, res) => {
   const { action, categoryId, newCategoryId } = req.body;

   if (action === 'delete') {
      await pool.query('DELETE FROM items WHERE category_id = $1', [
         categoryId,
      ]);
   } else if (action === 'reassign' && newCategoryId) {
      await pool.query(
         'UPDATE items SET category_id = $1 WHERE category_id = $2',
         [newCategoryId, categoryId]
      );
   } else if (action === 'nullify') {
      await pool.query(
         'UPDATE items SET category_id = NULL WHERE category_id = $1',
         [categoryId]
      );
   }

   await pool.query('DELETE FROM categories WHERE id = $1', [categoryId]);
   res.redirect('/');
};
