// Evita que un usuario logueado acceda a las rutas de login
function guestOnly(req, res, next) {
  if (req.session.usuarioLogueado) {
    return res.redirect('/'); // bloquea si YA hay sesion
  }
  next(); // deja pasar solo si NO está logueado
}

module.exports = guestOnly;