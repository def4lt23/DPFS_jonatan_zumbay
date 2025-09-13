const fs = require("fs"); //file system
const path = require("path"); // manejar las rutas
const bycripts = require("bcryptjs"); // encriptar contraseñas
const {v4: uudi} = require("uuid"); // generar ids unicos

const usersPath = path.join(__dirname, "../data/users.json"); // ruta al archivo de usuarios

const userController = {
  carrito: function (req, res, next) {
    res.render("users/carrito.ejs", { title: "Carrito" });
  },

  quienessomos: function (req, res, next) {
    res.render("users/quienessomos.ejs", { title: "QuienesSomos" });
  },

  registro: function (req, res, next) {
    res.render("users/registro.ejs", {
      title: "Registro",
      mensaje: " ", //coloco un msj vacio si es por navegacion, si da un error en el registro se completa
    });
  },

  procesarLogin: function (req, res, next) {
    console.log(req.body);
    res.render("/", { title: "LUZIFY" });
  },

  procesarRegistro: function (req, res, next) {
    //console.log(req.body);
    //console.log(req.file); // Información del archivo subido

    const usuariosjs = JSON.parse(fs.readFileSync(usersPath, "utf-8")); //usuarios a js

    //controlar que el email no este registrado
    const emailExiste = usuariosjs.some(
      (usuario) => usuario.email === req.body.correo
    );
    if (emailExiste) {
      return res.render("users/registro.ejs", {
        title: "Registro",
        mensaje: "El correo ya esta registrado",
      });
    }

    //controlar que el nombre de usuario no este registrado
    const nombreUsuarioExiste = usuariosjs.some(
      (usuario) => usuario.usuario === req.body.usuario
    );
    if (nombreUsuarioExiste) {
      return res.render("users/registro.ejs", {
        title: "Registro",
        mensaje: "El nombre de usuario ya existe, elija otro por favor",
      });
    }

    if (req.body.contrasena1 == req.body.contrasena2) {
      const nuevoUsuario = {
        id: uudi(), // genera un id unico
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.correo,
        usuario: req.body.usuario,
        contrasena: bycripts.hashSync(req.body.contrasena1, 10), // encripta la contraseña
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        rol: req.body.rol,
        avatar: req.file ? req.file.filename : "sinavatar.png",
        fechaRegistro: new Date().toISOString(),
      };
      usuariosjs.push(nuevoUsuario); // agrega el nuevo usuario al array de usuarios
      const usuariosJson = JSON.stringify(usuariosjs, null, 2); // convierte el array de usuarios a json
      fs.writeFileSync(usersPath, usuariosJson, "utf-8"); // escribe el archivo de usuarios
      res.redirect("/"); // redirige al index
    } else {
      return res.render("users/registro.ejs", {
        title: "Registro",
        mensaje: "Las contraseñas no coinciden",
      });
    }
  },
};

module.exports = userController;
