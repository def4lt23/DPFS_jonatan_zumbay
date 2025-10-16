const db = require("../database/models/index.js"); // Base de datos (sequelize)

async function userLogged(req, res, next) {
  // Si no hay usuario logueado pero sí una cookie
  if (!req.session.usuarioLogueado && req.cookies.usuarioEmail) { //si existe la cookie
    try {
      const usuarioEncontrado = await db.User.findOne({ //busco en la base de datos
        where: { email: req.cookies.usuarioEmail },
      });

      if (usuarioEncontrado) { //si lo encuentro
        const usuario = usuarioEncontrado.toJSON(); //lo paso a json
        delete usuario.contrasena; // eliminamos contraseña 
        req.session.usuarioLogueado = usuario; //lo guardo en session
      }
    } catch (error) {
      console.error("Error buscando usuario por cookie:", error); //log del error
    }
  }

  // Variables locales accesibles desde las vistas
  if (req.session && req.session.usuarioLogueado) { //si hay session
    res.locals.isLogged = true; 
    res.locals.userLogged = req.session.usuarioLogueado; //guardo el usuario en una variable local
    res.locals.isAdmin = req.session.usuarioLogueado.role === "admin"; 
  } else {
    res.locals.isLogged = false; //no hay usuario logueado
    res.locals.userLogged = { usuario: "" };
    res.locals.isAdmin = false;
  }

  next();
}

module.exports = userLogged;
