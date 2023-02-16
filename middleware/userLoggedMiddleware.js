
function userLoggedMiddleware(req, res, next){

    console.log('en el middleware ahora');
       //al estar en una variable local, toda lss vistas conocen de esa variable
      // esta en false y cuanddo alguien esta en session tiene que pasar a true
    if(req.session.usuarioLogueado){
        res.locals.isLogged = true;   //si hay alguien logeado isLogged pasa a true
        res.locals.usuarioLogueado = req.session.usuarioLogueado //paso la informacion del usuario en session  una variable local
        console.log('usuario logueado');
    }else{
        res.locals.usuarioLogueado = false;
        console.log('No hay usuario logueado');
    }
    //let emailInCooke = req.cookie.recordame;
   // console.log(emailInCooke);
    next();
}

module.exports = userLoggedMiddleware; 