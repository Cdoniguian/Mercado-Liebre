// 1- guardar un producto.
// 2- Buscar un producto por si ID.
// 3- Editar la informacion de un producto.
// 4- Eliuminar un producto.
const fs = require('fs');

const Product = {
    fileName: './data/productsDB.json',
    //-----traemos los Productos y lo convertimos en un array usando al File System-----//
    getData: function () {   //este método devuelve todo el JSON para convertirlo en array uso, JSON.parse()
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    },
    //------------------------- METODO PARA GENERAR UN ID----------
    generateId: function () {
        let allProducts = this.findAll();// Traemos a todos Productos findAll y lo guardamos en una variable
        let lastProducts = allProducts.pop(); //buscamos el último
        if (lastProducts) {  //ssi no hay Productos, hago el condicional.. si lasrProduct exista, le sumo 1, si no es 1 
            return lastProducts.id + 1
        }
        return 1;
    },

    //------------------------- buscamos TODOS los Productos----------
    findAll: function () {
        return this.getData();
    },

    //------------------------- buscamos el Productos por ID----------
    findByPk: function (id) { //primero traemos a todos Productos findAll y lo guardamos en una variable
        let allProducts = this.findAll(); //ahora buscamos el del id usando el metodo .find(condicion)
        let productsToFound = allProducts.find(oneProducts => oneProducts.id === id);
        return productsToFound;
    },

    //------------------------- buscamos por cualquier campo  ("firstName" , "dolr")------------
    findByField: function (field, text) { //primero traemos a todos Productos findAll y lo guardamos en una variable
        let allProducts = this.findAll(); //ahora buscamos por el texto usando el metodo .find(condicion)
        let productsToFound = allProducts.find(oneProducts => oneProducts[field] === text);
        return productsToFound;
    },
    //-------- Creamos un Productos... recibe como argumento un OL (productData) del formulario (req.Body) 
    create: function (productData) {
        let allProducts = this.findAll();  // traemos a todos usando findAll y lo guardamos en una variable
        let newProduct = {
            id: this.generateId(),// agregamos el Id en un OL y
            ...productData           //usamos el operador de propagacion  que es toda la info del formulario
        }
        allProducts.push(newProduct); //esto es unb array, hay que escribirlo en el JSON y pasasro a ese formato
        fs.writeFileSync(this.fileName, JSON.stringify(allProducts, null, ' '))
        //primera parte, lo escribe y la segunda lo convierte en forcmato JSON
        return newProduct;
    },
    delete: function (id) {
        let allProducts = this.findAll();//ahora buscamos el del id usando el metodo .filter(condicion) para filtrar
        let finalProducts = allProducts.filter(oneProduct => oneProduct.id !== id)
        //recorremos de a un producto que sea distinto al qiue pasamos 
        //despues lo escribimos en el JSON
        fs.writeFileSync(this.fileName, JSON.stringify(finalProducts, null, ' '));
        return true;
    }

}

module.exports = Product;

