const {
   getAllItems,
   createItem,
   getItemsByCategory,
} = require('../db/queries');

exports.getItems = async (req, res, next) => {
   const { categoryId, itemId } = req.query;
   let items;

   // Retain the selected category in the session
   if (categoryId) {
      req.session.selectedCategory = categoryId;
   }

   const selectedCategory = req.session.selectedCategory;

   try {
      // Fetch items by category if a category is selected
      if (selectedCategory) {
         items = await getItemsByCategory(selectedCategory);
      } else {
         items = await getAllItems();
      }

      req.items = items;

      // If an item is selected, find it from the filtered items
      if (itemId) {
         req.session.selectedItem = items.find((item) => item.id == itemId);
      } else {
         req.session.selectedItem = null;
      }

      next();
   } catch (err) {
      console.error('Error fetching items:', err.message);
      res.status(500).send('Internal Server Error');
   }
};

exports.addItem = async (req, res) => {
   try {
      const {
         name,
         price,
         specifications,
         category_id,
         manufacturer_id,
         slug,
      } = req.body;
      await createItem(
         name,
         price,
         specifications,
         category_id,
         manufacturer_id,
         slug
      );
      res.redirect('/items');
   } catch (err) {
      console.error('Error adding item:', err.message);
      res.status(500).send('Internal Server Error');
   }
};

exports.editItem = async (req, res) => {
   const { id } = req.params;
   const { name, price, stock, category_id, manufacturer_id, slug } = req.body;
   await pool.query(
      'UPDATE items SET name = $1, price = $2, stock = $3, category_id = $4, manufacturer_id = $5, slug = $6 WHERE id = $7',
      [name, price, stock, category_id, manufacturer_id, slug, id]
   );
   res.redirect('/');
};

exports.deleteItem = async (req, res) => {
   const { id } = req.params;
   await pool.query('DELETE FROM items WHERE id = $1', [id]);
   res.redirect('/');
};

exports.addStock = async (req, res) => {
   const { id } = req.params;
   const { quantity } = req.body;
   await pool.query('UPDATE items SET stock = stock + $1 WHERE id = $2', [
      quantity,
      id,
   ]);
   res.redirect('/');
};

exports.removeStock = async (req, res) => {
   const { id } = req.params;
   const { quantity } = req.body;
   await pool.query('UPDATE items SET stock = stock - $1 WHERE id = $2', [
      quantity,
      id,
   ]);
   res.redirect('/');
};
