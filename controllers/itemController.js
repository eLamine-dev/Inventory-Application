const {
   getAllItems,
   createItem,
   getItemsByCategory,
   editItem,
   deleteItem,
   updateStock,
   getItemByCategory,
} = require('../db/queries');

exports.getItems = async (req, res, next) => {
   const { selectedCategoryId, selectedItemId } = req.session;

   try {
      const items = selectedCategoryId
         ? await getItemsByCategory(selectedCategoryId)
         : await getAllItems();

      req.items = items;

      if (selectedItemId) {
         const selectedItem = items.find((item) => item.id == selectedItemId);
         req.session.selectedItem = selectedItem;
      } else {
         req.session.selectedItem = null;
      }

      req.session.items = items;

      next();
   } catch (err) {
      console.error('Error fetching items:', err.message);
      res.status(500).send('Internal Server Error');
   }
};

exports.getAnItemByCategory = async (req, res) => {
   const { categoryId } = req.params;
   try {
      const item = await getItemByCategory(categoryId);

      if (item.length > 0) {
         res.json(item[0]);
      } else {
         res.json({ specifications: {} });
      }
   } catch (err) {
      console.error('Error fetching item by category:', err.message);
      res.status(500).send('Internal Server Error');
   }
};

exports.selectItem = async (req, res) => {
   const { itemId } = req.params;
   try {
      req.session.selectedItemId = itemId || null;
      const selectedItem = req.session.items.find(
         (item) => item.id == req.session.selectedItemId
      );
      req.session.selectedItem = selectedItem || { name: '' };
      res.redirect('/'); // Redirect back to dashboard
   } catch (err) {
      console.error('Error selecting item:', err.message);
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
   await editItem(id, name, price, stock, category_id, manufacturer_id, slug);
   res.redirect('/');
};

exports.deleteItem = async (req, res) => {
   try {
      const { id } = req.params;

      await deleteItem(id);

      if (req.session.selectedItemId === id) {
         req.session.selectedItemId = null;
         req.session.selectedItem = null;
      }

      res.redirect('/');
   } catch (err) {
      console.error('Error deleting item:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
   }
};

exports.updateStock = async (req, res) => {
   const { itemId, action, quantity } = req.body;
   try {
      await updateStock(itemId, action, parseInt(quantity, 10));
      res.redirect('/');
   } catch (err) {
      console.error('Error updating stock:', err.message);
      res.status(500).send('Internal Server Error');
   }
};
