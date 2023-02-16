const { log } = require('console');
const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/productsDB.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const Products = require('../models/Products');


const productsController = {
	create: (req, res) => {
		//res.send('estoy en la creacion de producto')
		res.render('products/productCreate', { user: req.session.usuarioLogueado });
	},
	store: (req, res) => {

		console.log('---------------en el store-------------')
		//res.send(req.body)
		console.log('---------------creando-------------')

		let nuevoProducto = {

			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description,
			image: req.file.originalname,
			on_off: req.body.on_off,
			featured: req.body.featured
		};

		console.log(nuevoProducto);
		Products.create(nuevoProducto);
		res.render('products/productsList', { products: products, user: req.session.usuarioLogueado  });
	},

	detail: (req, res) => {

		const productoID = products[req.params.id]

		res.render('products/detail', { items: productoID, user: req.session.usuarioLogueado })

	},
	edit: (req, res) => {
		//res.send('en el edit')
		const productoID = products[req.params.id];
		
		res.render('products/productEditForm', { items: productoID, user: req.session.usuarioLogueado });
	},

	update: (req, res) => {
		console.log('___________________editando un produscto______________________')
		console.log('por editar el producto: ' + req.params.id  + ' nombre: ' + req.body.name);
		console.log(req.body); //vemos que viene por el Body 
	
		//guardo en una variable  lo que trar el formulario-------------
		 let productUpdate = req.body; 

		 //-----------Atendemos a la imagen--------------------
		console.log(req.file)
		let file = req.file; //en req.file estan los dtos de la imagen 
		if (!file) {    //si no hay nada en el file, dejo el la imagen del producto anterior
			productUpdate.image = products[req.params.id].image
		} else
			productUpdate.image = req.file.originalname; // si no, de file, busco el npombre de la imagen en originalname
		//-------------------------------------------------------

		products[req.body.id] = productUpdate;
		let productoJson = JSON.stringify(products);

		fs.writeFileSync(productsFilePath, productoJson)
		res.render('products/productsList', { products: products, user: req.session.usuarioLogueado });  
	},

	offert: (req, res) => {

		res.render('products/offert', { products, user: req.session.usuarioLogueado });
	},
	featured: (req, res) => {

		res.render('products/featured', { products, user: req.session.usuarioLogueado });
	},

	list: (req, res) => {

		res.render('products/productsList', { products, user: req.session.usuarioLogueado });
	},


	destroy: (req, res) => {
		console.log("borrando.." + req.params.id);

		//products = products.filter(producto => producto.id != req.params.id);
		products.splice(req.params.id, 1);  //borra solo el elemento indicado del arra

		console.log(products);
		let productoJson = JSON.stringify(products);
		fs.writeFileSync(productsFilePath, productoJson);

		res.render('products/productsAdminList', { products: products, user: req.session.usuarioLogueado });
	},
	destroy1: (req, res) => {
		//res.send('en la ruta de borrado')
		console.log("borrando.." + req.params.id);
		console.log('cantidad de productosd...' + products.length);
		console.log(products[req.params.id].id);


		for (let i = 0; i < products.length; i++) {
			console.log('en el for' + i);

			if (products[i].id == products[req.params.id].id) {

				console.log('en el if');
				console.log(products[i])
				var newId = i;
				console.log(i);
				console.log(newId);

			}
		}
		console.log('newId..' + newId);
		products.splice(newId, 1);  //borra solo el elemento indicado del arra
		let productoJson = JSON.stringify(products);
		fs.writeFileSync(productsFilePath, productoJson);

		res.render('products/productsAdminList', { products: products, user: req.session.usuarioLogueado });
	},
	disabled: (req, res) =>{
		res.render('products/productsListDisabled', { products: products, user: req.session.usuarioLogueado });
	}
};

module.exports = productsController 
