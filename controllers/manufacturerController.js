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

exports.editManufacturer = async (req, res) => {
   const { id } = req.params;
   const { name } = req.body;
   await pool.query('UPDATE manufacturers SET name = $1 WHERE id = $2', [
      name,
      id,
   ]);
   res.redirect('/');
};

exports.deleteManufacturer = async (req, res) => {
   const { id } = req.params;
   await pool.query('DELETE FROM manufacturers WHERE id = $1', [id]);
   res.redirect('/');
};
