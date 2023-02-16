function authMiddleware( req, res, next){
    console.log('en el MD')
    if(!req.session.usuarioLogueado){
        console.log('en el IF')
        return res.redirect('/users/login');
    }
    next();
}

module.exports = authMiddleware