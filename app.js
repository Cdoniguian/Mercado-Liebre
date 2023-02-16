// ************ Require's ************
const express = require('express');
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE
const path = require('path');   // Pasar poder usar rutas abolutas
const puerto = 3031;
const session = require('express-session'); // modulo para trabajar con session... se guarda en el servidor
const cookies = require('cookie-parser');  // modulo para trabajar con cookies... se guarda en el cliente (navegador)
const userLoggedMidddleware = require('./middleware/userLoggedMiddleware')

// ************ express() - (don't touch) ************
const app = express();
//------------------------------------------------------------

app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true})); //para capturar la info de un formulario via POST

// Routers ------------------------------------------------------
 const mainRouter = require('./routers/mainRouter');
 const productRouter = require('./routers/productRouter');
 const userRouter = require('./routers/userRouter');

//--------------para usar un Json ------------------------------------------------
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//--------------para usar session a nivel global -----------
app.use(session({
  secret: " ",
  resave: false,
  saveUninitialized:false,
}));
//--------------- Middleware de login-----------------
app.use(userLoggedMidddleware);
app.use(cookies());
//----------------------------------------------------

app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE

// ************ Template Engine - (don't touch) ************
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views')); // Define la ubicación de la carpeta de las Vistas
// ************ Route System require and use() ************
app.use("/", mainRouter);
app.use("/products/", productRouter);
app.use("/users", userRouter);

//--------------------------------------------------------------------------------------------------

// ************ DON'T TOUCH FROM HERE ************
// ************ catch 404 and forward to error handler ************
app.use((req, res, next) => next(createError(404)));

// ************ error handler ************
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.path = req.path;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

    // ---------------se atiende al puerto--------------
    app.listen(puerto, ()=>{
        console.log("Esta corriendo en el puerto " + puerto);
    });
    module.exports = app;