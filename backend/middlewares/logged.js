//evita que cualquier persona pueda escribir la URL directamente en el navegador y acceder a la vista, incluso sin estar logueada.
function logged (req, res, next){
if (req.session.usuarioLogueado){ // Si existe la sesion
    return next(); // deja pasar si esta logueado
}
res.redirect('/') // Si no existe la sesion, redirigir al login
}
module.exports = logged;

