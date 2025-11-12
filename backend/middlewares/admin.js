//que solo los administradores puedan acceder a editar los productos
function admin (req, res, next){
    if (req.session.usuarioLogueado && req.session.usuarioLogueado.role === 'admin'){ // Si existe la sesion y el rol es administrador
        return next(); // deja pasar si es admin
    }
    res.redirect('/') // Si no existe la sesion o no es admin, redirigir al login
}
exports = module.exports = admin;