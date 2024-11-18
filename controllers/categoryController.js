const {
   getCategories,
   createCategory,
   deleteCategory,
} = require('../db/queries');

exports.getAllCategories = async (req, res) => {
   const categories = await getCategories();
   res.locals.categories = categories;
   res.render('dashboard');
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
