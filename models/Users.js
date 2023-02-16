// 1- guardar un usuario.
// 2- buscar un usuario por su email.
// 3- Buscar un usuario por si ID.
// 4- Editar la uinformacion de un usuario.
// 5- Eliuminar un usuario.
const fs =  require('fs');

const User = {
    fileName: './data/userDB.json',
    //-----traemos los usuarios y lo convertimos en un array usando al File System-----//
    getData: function(){   //este método devuelve todo el JSON para convertirlo en array uso, JSON.parse()
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8')); 
    },
 //------------------------- METODO PARA GENERAR UN ID----------
    generateId: function(){
        let allUsers = this.findAll();// Traemos a todos usando findAll y lo guardamos en una variable
        let lastUser  = allUsers.pop(); //buscamos el último
        if(lastUser){  //ssi no hay usuarios, hago el condicional.. si lasrUser exista, le sumo 1, si no es 1 
            return lastUser.id+1
        }
        return 1;
    },

     //------------------------- buscamos TODOS los usuarios----------
    findAll: function(){
        return this.getData();
    }, 

    //------------------------- buscamos el usuario por ID----------
    findByPk: function(id){ //primero traemos a todos usando findAll y lo guardamos en una variable
        let allUsers = this.findAll(); //ahora buscamos el del id usando el metodo .find(condicion)
        let userToFound = allUsers.find(oneUser => oneUser.id === id);
        return userToFound;
    },
    //------------------------- buscamos el usuario por email------------
    findByEmail: function(email){ //primero traemos a todos usando findAll y lo guardamos en una variable
        let allUsers = this.findAll(); //ahora buscamos por Email usando el metodo .find(condicion)
        let userToFound = allUsers.find(oneUser => oneUser.email === email);
        return userToFound;
    },
    //------------------------- buscamos por cualquier campo  ("firstName" , "dolr")------------
    findByField: function(field , text){ //primero traemos a todos usando findAll y lo guardamos en una variable
        let allUsers = this.findAll(); //ahora buscamos por Email usando el metodo .find(condicion)
        let userToFound = allUsers.find(oneUser => oneUser[field] === text);
        return userToFound;
    },
//-------- Creamos un usuario... recibe como argumento un OL (userData) del formulario (req.Body) 
    create: function(userData){
        let allUsers = this.findAll();  // traemos a todos usando findAll y lo guardamos en una variable
        let newUser = {
            id: this.generateId(),// agregamos el Id en un OL y
            ...userData           //usamos el operador de propagacion  que es toda la info del formulario
        }
        allUsers.push(newUser); //esto es unb array, hay que escribirlo en el JSON y pasasro a ese formato
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '))
        //primera parte, lo escribe y la segunda lo convierte en forcmato JSON
        return newUser;
    },
   

    delete: function(id){
        let allUsers = this.findAll();//ahora buscamos el del id usando el metodo .filter(condicion) para filtrar
        let finalUser = allUsers.filter(oneUser => oneUser.id !== id) 
        //recorremos de a un usuario que sea distinto al qiue pasamos 
        //despues lo escribimos en el JSON
        fs.writeFileSync(this.fileName, JSON.stringify(finalUser, null, ' '));
        return true;
    }
   
}

 module.exports = User;

