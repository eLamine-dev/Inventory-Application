const {
   getAllCategories,
   createCategory,
   deleteCategory,
   editCategory,
   confirmCategoryDeletionQueries,
   handleCategoryDeletionQueries,
} = require('../db/queries');

exports.getCategories = async (req, res, next) => {
   try {
      const categories = await getAllCategories();
      req.categories = categories;
      next();
   } catch (err) {
      console.error('Error fetching categories:', err.message);
      res.status(500).send('Internal Server Error');
   }
};

exports.selectCategory = async (req, res) => {
   const { categoryId } = req.params;
   try {
      req.session.selectedCategoryId = categoryId;
      req.session.selectedItemId = null;
      res.redirect('/');
   } catch (err) {
      console.error('Error selecting category:', err.message);
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

exports.editCategory = async (req, res) => {
   const { id } = req.params;
   const { name, slug } = req.body;
   await editCategory(id, name, slug);
   res.redirect('/');
};

exports.confirmCategoryDeletion = async (req, res) => {
   const { id } = req.params;
   const items = await confirmCategoryDeletionQueries.getItemsByCategory(id);
   const categories = await confirmCategoryDeletionQueries.getOtherCategories(
      id
   );
   res.render('categories/confirmDeletion', {
      categoryId: id,
      items,
      categories,
   });
};

exports.handleCategoryDeletion = async (req, res) => {
   const { action, categoryId, newCategoryId } = req.body;
   if (action === 'delete') {
      await handleCategoryDeletionQueries.deleteItemsByCategory(categoryId);
   } else if (action === 'reassign' && newCategoryId) {
      await handleCategoryDeletionQueries.reassignItemsCategory(
         newCategoryId,
         categoryId
      );
   } else if (action === 'nullify') {
      await handleCategoryDeletionQueries.nullifyItemsCategory(categoryId);
   }
   await handleCategoryDeletionQueries.deleteCategory(categoryId);
   res.redirect('/');
};
