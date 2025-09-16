const fs = require("fs"); //file system
const path = require("path"); // manejar las rutas
const bycripts = require("bcryptjs"); // encriptar contraseñas
const { v4: uudi } = require("uuid"); // generar ids unicos

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
      mensaje: " ",
    });
  },

  procesarLogin: function (req, res, next) {
    const usuariosjs = JSON.parse(fs.readFileSync(usersPath, "utf-8"));
    const usuarioEncontrado = usuariosjs.find(
      (usuario) => usuario.email === req.body.usuario
    );
    if (!usuarioEncontrado) {
      return res.render("users/registro.ejs", {
        title: "Registro",
        mensaje: "El correo no esta registrado",
      });
    } else {
      const contraseñaCorrecta = bycripts.compareSync(
        req.body.contrasena,
        usuarioEncontrado.contrasena
      );
      if (!contraseñaCorrecta) {
        return res.render("users/registro.ejs", {
          title: "Registro",
          mensaje: "La contraseña es incorrecta",
        });
      } else {
        const { contrasena, ...usuarioSinPassword } = usuarioEncontrado;
        req.session.usuarioLogueado = usuarioSinPassword;

        if (req.body.recordar) {
          res.cookie("usuarioEmail", usuarioEncontrado.email, {
            maxAge: 3600000,
          });
        }
        res.redirect("/users/perfil");
      }
    }
  },

  procesarRegistro: function (req, res, next) {
    const usuariosjs = JSON.parse(fs.readFileSync(usersPath, "utf-8"));

    const emailExiste = usuariosjs.some(
      (usuario) => usuario.email === req.body.correo
    );
    if (emailExiste) {
      return res.render("users/registro.ejs", {
        title: "Registro",
        mensaje: "El correo ya esta registrado",
      });
    }

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
        id: uudi(),
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.correo,
        usuario: req.body.usuario,
        contrasena: bycripts.hashSync(req.body.contrasena1, 10),
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        rol: req.body.rol,
        avatar: req.file ? req.file.filename : "sinavatar.png",
        fechaRegistro: new Date().toISOString(),
      };
      usuariosjs.push(nuevoUsuario);
      const usuariosJson = JSON.stringify(usuariosjs, null, 2);
      fs.writeFileSync(usersPath, usuariosJson, "utf-8");
      res.redirect("/");
    } else {
      return res.render("users/registro.ejs", {
        title: "Registro",
        mensaje: "Las contraseñas no coinciden",
      });
    }
  },

  vistaPerfil: function (req, res, next) {
    res.render("users/perfil.ejs", {
      title: "Perfil",
      usuario: req.session.usuarioLogueado,
    });
  },

  editarUsuarioVista: function (req, res, next) {
    res.render("users/editarusuario.ejs", {
      userLogged: req.session.usuarioLogueado,
      title: "Editar Usuario",
      mensaje: "",
    });
  },

  editarUsuariojson: function (req, res, next) {
    const usuariosjs = JSON.parse(fs.readFileSync(usersPath, "utf-8"));
    const nombreExiste = usuariosjs.find(
      (u) =>
        u.usuario === req.body.usuario &&
        u.id !== req.session.usuarioLogueado.id
    );
    if (nombreExiste) {
      return res.render("users/editarusuario", {
        title: "Editar Usuario",
        mensaje: "El nombre de usuario ya está en uso",
        userLogged: req.session.usuarioLogueado,
      });
    }

    usuariosjs.forEach((usuariotemp) => {
      if (usuariotemp.id == req.session.usuarioLogueado.id) {
        usuariotemp.nombre = req.body.nombre;
        usuariotemp.apellido = req.body.apellido;
        usuariotemp.telefono = req.body.telefono;
        usuariotemp.direccion = req.body.direccion;
        usuariotemp.usuario = req.body.usuario;

        if (req.file) {
          usuariotemp.avatar = req.file.filename;
        }

        const contrasenaCorrecta = bycripts.compareSync(
          req.body.contrasena,
          usuariotemp.contrasena
        );

        if (req.body.nuevacontrasena || req.body.confirmarcontrasena) {
          if (!req.body.contrasena) {
            return res.render("users/editarusuario", {
              title: "Editar Usuario",
              mensaje: "Escriba su contraseña actual para cambiarla",
              userLogged: req.session.usuarioLogueado,
            });
          } else if (!contrasenaCorrecta) {
            return res.render("users/editarusuario", {
              title: "Editar Usuario",
              mensaje: "La contraseña actual es incorrecta",
              userLogged: req.session.usuarioLogueado,
            });
          } else if (
            req.body.nuevacontrasena !== req.body.confirmarcontrasena
          ) {
            return res.render("users/editarusuario", {
              title: "Editar Usuario",
              mensaje: "Las nuevas contraseñas no coinciden",
              userLogged: req.session.usuarioLogueado,
            });
          } else {
            usuariotemp.contrasena = bycripts.hashSync(
              req.body.nuevacontrasena,
              10
            );
          }
        }
      }
    });

    if (req.body.usergod && req.body.emailgod && req.body.divinepass) {
      const dios = usuariosjs.find(
        (u) => u.usuario === req.body.usergod && u.email === req.body.emailgod
      );
      if (dios) {
        const adminEncontrado = usuariosjs.find(
          (u) =>
            u.rol === "administrador" && u.id === req.session.usuarioLogueado.id
        );

        if (!adminEncontrado) {
          return res.render("users/editarusuario", {
            title: "Editar Usuario",
            mensaje: "Accion no permitida",
            userLogged: req.session.usuarioLogueado,
          });
        }

        const contrasenaDivinaCorrecta = bycripts.compareSync(
          req.body.divinepass,
          adminEncontrado.contrasena
        );

        if (contrasenaDivinaCorrecta) {
          dios.rol = "administrador";
        } else {
          return res.render("users/editarusuario", {
            title: "Editar Usuario",
            mensaje: "Contraseña Divina incorrecta",
            userLogged: req.session.usuarioLogueado,
          });
        }
      } else {
        return res.render("users/editarusuario", {
          title: "Editar Usuario",
          mensaje: "El usuario o email del futuro Dios no existen",
          userLogged: req.session.usuarioLogueado,
        });
      }
    }

    const usuariosJson = JSON.stringify(usuariosjs, null, 2); // Convertir a JSON
    fs.writeFileSync(usersPath, usuariosJson, "utf-8"); // Guardar en el archivo
    res.redirect("/users/perfil");
  },

  cerrarsesion: function (req, res) {
    req.session.destroy();
    res.clearCookie("usuarioEmail");
    return res.redirect("/");
  },
};

module.exports = userController;
