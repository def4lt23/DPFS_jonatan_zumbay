const fs = require("fs"); //file system
const path = require("path"); // manejar las rutas

function userLogged (req, res, next) {
  if (req.session && req.session.usuarioLogueado) {
    res.locals.isLogged = true;
    res.locals.userLogged = req.session.usuarioLogueado;
    res.locals.isAdmin = req.session.usuarioLogueado.rol === 'administrador';
  } else {
    // Inicializamos valores por defecto para evitar errores
    res.locals.isLogged = false;
    res.locals.userLogged = { usuario: '' }; // objeto con propiedad vacía
    res.locals.isAdmin = false;
  }

  if(!req.session.usuarioLogueado && req.cookies.usuarioEmail) { // si no hay session pero si cookie
    const usersPath = path.join(__dirname, "../data/users.json"); // ruta al archivo de usuarios
    const usuariosjs = JSON.parse(fs.readFileSync(usersPath, "utf-8")); //usuarios a js

    const usuarioEncontrado = usuariosjs.find(usuario => usuario.email === req.cookies.usuarioEmail);
    if(usuarioEncontrado) {
      const { contrasena, ...usuarioSinPassword } = usuarioEncontrado; //paso todo menos la contraseña
      req.session.usuarioLogueado = usuarioSinPassword;
      res.locals.isLogged = true;
      res.locals.userLogged = req.session.usuarioLogueado;
      res.locals.isAdmin = req.session.usuarioLogueado.rol === 'administrador';
    }
  }

  next();
}

module.exports = userLogged;