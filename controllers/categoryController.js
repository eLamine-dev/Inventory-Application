const { getCategories, createCategory } = require('../db/queries');

exports.getAllCategories = async (req, res) => {
   const categories = await getCategories();
   res.render('categories/index', { categories });
};

exports.addCategory = async (req, res) => {
   const { name, slug } = req.body;
   await createCategory(name, slug);
   res.redirect('/categories');
};
