const { getItems, createItem } = require('../db/queries');

exports.getAllItems = async (req, res) => {
   try {
      const items = await getItems();
      res.render('items/index', { items });
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
