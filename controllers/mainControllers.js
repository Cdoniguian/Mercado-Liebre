const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDB.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const mainController = {
	index: (req, res) => {
	
		 res.render('index', { products: products , user: req.session.usuarioLogueado });
	}
	
};

module.exports = mainController 
	
