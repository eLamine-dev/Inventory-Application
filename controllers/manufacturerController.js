const { getManufacturers, createManufacturer } = require('../db/queries');

exports.getAllManufacturers = async (req, res) => {
   try {
      const manufacturers = await getManufacturers();
      res.render('manufacturers/index', { manufacturers });
   } catch (err) {
      console.error('Error fetching manufacturers:', err.message);
      res.status(500).send('Internal Server Error');
   }
};

exports.addManufacturer = async (req, res) => {
   try {
      const { name } = req.body;
      await createManufacturer(name);
      res.redirect('/manufacturers');
   } catch (err) {
      console.error('Error adding manufacturer:', err.message);
      res.status(500).send('Internal Server Error');
   }
};
