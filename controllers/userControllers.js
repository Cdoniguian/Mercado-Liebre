const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const userFilePath = path.join(__dirname, '../data/userDB.json');
const user = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));
const { validationResult } = require('express-validator');
const User = require('../models/Users');


const userController = {
  register: (req, res) => {
    //res.send(('estoy acaaaaa')) 

    res.render('users/registerForm');

  },

  processRegister: (req, res) => {

    let errors = validationResult(req);
    //*********** Verificamos si el Mail ya existe en el JSON */
    for (let i = 0; i < user.length; i++) {   //iteramos en el JSON
      if (user[i].email == req.body.email) {   //Si el email que viene del formulario(body) == delm JSON
        errors.errors.push({
          value: req.body.email,  //agregamos al OL de errores el error con sus parametros
          msg: 'Email ya registrado',
          param: 'email',
          location: 'body'
        })
      }
    }


    //******************************************************* */
    if (errors.isEmpty()) {
      console.log('------------no hay errores-----------------------')

      let nuevoUsuario = {

        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthdate: req.body.birthdate,
        email: req.body.email,
        address: req.body.address,
        image: !req.file ? "userDefault1.jpg" : req.file.originalname,
        password: bcrypt.hashSync(req.body.password, 10)

      }
      User.create(nuevoUsuario)

      res.render('users/login');

    } else {
      res.render('users/registerForm', { errors: errors.mapped(), oldData: req.body });
    }

  },

  login: (req, res) => {  
    res.render('users/login');

  },

  loginProcess: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      console.log('----no hay errores en el login----------')

      let userToLogin = User.findByField('email', req.body.email);

      console.log(userToLogin);

      if (userToLogin) {
        let passOK = bcrypt.compareSync(req.body.password, userToLogin.password)
        if (passOK) {

          delete userToLogin.password;
          res.locals.isLogged = true;
          req.session.usuarioLogueado = userToLogin;
          console.log(res.locals.isLogged)

          if(req.body.remember_user){ 
            res.cookie('recordame', req.body.email,{maxAge:100000})
          }

          return res.redirect('/');

        } else {
          res.locals.isLogged = false;

          console.log('----errores en el pass---------')
          res.render('users/login', {
            errors: {
              email: { msg: 'Credenciales inválidas' },
              password: { msg: 'Credenciales inválidas' }
            }
          })
        }
      }
    } else {
      console.log('--Los errores son--');
      console.log(errors);
      console.log('---Lo que viene del formulario---')
      console.log(req.body)
      res.render('users/login', { errors: errors.mapped(), oldData: req.body });
    };
  },

  

  profile: (req, res) => {

    return res.render('users/profile', )
  },

  logout: (req, res) => {
    console.log('borrando la session')
    req.session.destroy();
    res.locals.isLogged = false;
    return res.redirect('/');
  },

  userList: (req, res)=> {
    res.render('users/userList', {users: user, user: req.session.usuarioLogueado });
  },

  edit: (req, res)=>{
    const userID = user[req.params.id];
    res.render('users/userEditForm', {users: userID, user: req.session.usuarioLogueado });
  },
  
  update: (req, res)=>{
    res.send("por putttt")
  }
  
};

module.exports = userController
