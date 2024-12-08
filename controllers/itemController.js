const {
   getAllItems,
   createItem,
   getItemsByCategory,
   editItem,
   deleteItem,
   updateStock,
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
   const { id } = req.params;
   await deleteItem(id);
   res.redirect('/');
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
