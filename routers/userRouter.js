// ************ Require's ************
const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const multer = require('multer'); 
const path = require('path');

// ************ Controller Require ************

const userController = require('../controllers/userControllers');

//************** IMPLEMENTACION DE MULTER lara subir archivos************* */
var storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null,path.join(__dirname, '../public/images'))
    },
    filename: function (req, file, cb) {

    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage });

//********************* middleware logueo------------------------------*/
const guestMiddleware = require('../middleware/guestMiddleware');
const authMiddleware = require('../middleware/guestMiddleware');

//********************* Validaciones del formulario de creacion "registerForm" con EXPRESS VALIDATOR */

const validateRegisterForm = [
  check('firstName').notEmpty().withMessage('Debes escribir un nombre'), 
  check('lastName').notEmpty().withMessage('Escribí apellido'),
  check('birthdate').notEmpty().withMessage('Debes ingresar tu fecha de nacimiento'), 
  check('address').notEmpty().withMessage('Ingrese una direccion correcta'),
  check('email').notEmpty().withMessage('Escribí un email').isEmail().withMessage('Formato de Email no valido'),
  check('password').notEmpty().withMessage('Ingresa una contraseña').isLength({ min:8 }).withMessage('debe tener 8 caracteres'),
  check('confirmPass').notEmpty().withMessage('Reingrese la contraseña')
                                 .custom((confirmPass, {req})=>{
                                          if(confirmPass != req.body.password){
                                              throw new Error('La confirmación debe ser igual a la contraseña')
                                          }
                                  return true;
                                 })
]
//********************* Validaciones del formulario de Login con EXPRESS VALIDATOR */
const validateLoginForm = [
  check('email').notEmpty().withMessage('Escribí un email').isEmail().withMessage('Formato de Email no valido'),
  check('password').notEmpty().withMessage('Ingresa una contraseña').isLength({ min:8 }).withMessage('debe tener 8 caracteres'),
  ]
//****************** RUTAS ****************************************

router.get('/register',guestMiddleware ,userController.register); // Formulario de registro
router.post('/register', upload.single('avatar'),validateRegisterForm, userController.processRegister); // Procesar el registro


router.get('/login',guestMiddleware, userController.login); // Formulario de login
router.post('/login',validateLoginForm ,userController.loginProcess); // Procesar de login

//---------------------------------------
router.get('/profile/',userController.profile);
//------------LOGOUT_----
router.get('/logout/', userController.logout);

//------------userList----
router.get('/userList/', userController.userList);
//-------Modificacion de usuario
router.get('/userEditForm/:id/', userController.edit);
router.put('/update/:id', upload.single('image'), userController.update);
//--------------

module.exports = router;
