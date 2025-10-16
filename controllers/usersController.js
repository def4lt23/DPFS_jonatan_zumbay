const fs = require("fs"); //file system
const path = require("path"); // manejar las rutas
const bycripts = require("bcryptjs"); // encriptar contraseñas
const { v4: uudi } = require("uuid"); // generar ids unicos

const usersPath = path.join(__dirname, "../data/users.json"); // ruta al archivo de usuarios

const db = require("../database/models/index.js"); // Base de datos (sequelize)

// funcion utilitaria para capitalizar strings
function capitalizar(str) {
  if (!str) return "";
  str = str.trim();
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const userController = {
  //:::: VISTAS ::::
  carrito: function (req, res, next) {
    res.render("users/carrito.ejs", { title: "Carrito" });
  },

  quienessomos: function (req, res, next) {
    res.render("users/quienessomos.ejs", { title: "QuienesSomos" });
  },

  registro: function (req, res, next) {
    res.render("users/registro.ejs", {
      title: "Registro",
      mensaje: "",
    });
  },

  //::::: ACCEDER A LA CUENTA || LOGIN ::::: con base de datos
  procesarLogin: async function (req, res, next) {
    try {
      const usuarioEncontrado = await db.User.findOne({ where: { email: req.body.usuario },}); //busco el usuario por su email
      if (!usuarioEncontrado) { //si no lo encuentra
        return res.render("users/registro.ejs", {
          title: "Registro",
          mensaje: "El correo no esta registrado",
        });
      }
      const contraseñaCorrecta = bycripts.compareSync( //comparo las contraseñas
        req.body.contrasena,
        usuarioEncontrado.password //la que esta en la base de datos
      );

      if (!contraseñaCorrecta) { //si la contraseña es incorrecta
        return res.render("users/registro.ejs", {
          title: "Registro",
          mensaje: "La contraseña es incorrecta",
        });
      }
      const { contrasena, ...usuarioSinPassword } = usuarioEncontrado.toJSON(); //elimino la contraseñs del objeto usuario
      req.session.usuarioLogueado = usuarioSinPassword; //creo la session sin la contraseña
      if (req.body.recordar) { //si marco casilla recordar
        res.cookie("usuarioEmail", usuarioEncontrado.email, { //creo la cookie
          maxAge: 3600000,
        });
      }
      res.redirect("/users/perfil");
    } catch (error) {
      return res.status(500).send("Error al procesar el login"); //error servidor
    }
  },

  //::::: REGISTRARSE || USUARIO NUEVO ::::: con base de datos
  procesarRegistro: async function (req, res, next) {
    try {
      const usuarioExistente = await db.User.findOne({where: { email: req.body.correo },}); //busco el usuario por su email
      if (usuarioExistente) { //si ya existe
        return res.render("users/registro.ejs", {
          title: "Registro",
          mensaje: "El correo ya esta registrado",
        });
      }
      const nombreUsuarioExiste = await db.User.findOne({where: { username: req.body.usuario },}); //busco por nombre de usuario
      if (nombreUsuarioExiste) { //si ya existe
        return res.render("users/registro.ejs", {
          title: "Registro",
          mensaje: "El nombre de usuario ya existe, elija otro por favor",
        });
      }
      if (req.body.contrasena1 !== req.body.contrasena2) { //si las contraseñas no coinciden
        return res.render("users/registro.ejs", {
          title: "Registro",
          mensaje: "Las contraseñas no coinciden",
        });
      } else { //si todo esta bien, creo el nuevo usuario
        const nuevoUsuario = {
          name: capitalizar(req.body.nombre), //capitalizo nombre y apellido
          lastname: capitalizar(req.body.apellido),
          email: req.body.correo,
          username: req.body.usuario,
          password: bycripts.hashSync(req.body.contrasena1, 10), //encripto la contraseña
          numberphone: req.body.telefono,
          address: capitalizar(req.body.direccion),
          role: "client", //por defecto todos son clientes
          avatar: req.file ? req.file.filename : "sinavatar.png", //si subio foto uso su nombre, sino el defaul
          registerday: new Date(),
        };
        await db.User.create(nuevoUsuario); //creo el usuario en la base de datos
        req.session.mensaje =
          " --> Cuenta creada exitosamente, intenta ingresar ahora"; //mensaje de exito y mando al home
        return res.redirect("/");
      }
    } catch (error) {
      return res.status(500).send("Error al procesar el registro"); //error servidor
    }
  },

  //::::: PERFIL USUARIO :::::
  vistaPerfil: function (req, res, next) {
    res.render("users/perfil.ejs", {
      title: "Perfil",
      usuario: req.session.usuarioLogueado, //paso los datos del usuario logueado a la vista
    });
  },

  //::::: EDITAR USUARIO VISTA :::::
  editarUsuarioVista: function (req, res, next) {
    res.render("users/editarusuario.ejs", {
      userLogged: req.session.usuarioLogueado, //paso los datos del usuario logueado a la vista
      title: "Editar Usuario",
      mensaje: "", //mensaje vacio al cargar la vista por navegacion
    });
  },

  //::::: EDITAR USUARIO LOGICA ::::: con base de datos
  editarUsuarioDB: async function (req, res, next) {
    try {
      const usuarioLogueado = await db.User.findByPk(req.session.usuarioLogueado.id); //busco el usuario por su id
      if (!usuarioLogueado) { //si no lo encuentra
        return res.status(404).send("Usuario no encontrado");
      }
      if (req.body.usuario && req.body.usuario !== usuarioLogueado.username) { //si completo y es diferente al actual
        const nombreExiste = await db.User.findOne({where: { username: req.body.usuario },}); //busco por nombre de usuario
        if (nombreExiste) {
          return res.render("users/editarusuario", {
            title: "Editar Usuario",
            mensaje: "El nombre de usuario ya esta en uso",
            userLogged: req.session.usuarioLogueado, //mantengo los datos en la vista
          });
        }
        // si todo esta bien, actualizo el nombre de usuario
        usuarioLogueado.username = req.body.usuario;
      }
      if (req.body.nuevacontrasena || req.body.confirmarcontrasena) { //si completo alguno de los dos campos
        if (!req.body.contrasena) { //si no completo la actual
          return res.render("users/editarusuario", {
            title: "Editar Usuario",
            mensaje: "Escriba su contraseña actual para cambiarla",
            userLogged: req.session.usuarioLogueado,
          });
        }
        const contraseñaCorrecta = bycripts.compareSync( //valido la contraseña actual
          req.body.contrasena,
          usuarioLogueado.password
        );
        if (!contraseñaCorrecta) { //si es incorrecta
          return res.render("users/editarusuario", {
            title: "Editar Usuario",
            mensaje: "La contraseña actual es incorrecta",
            userLogged: req.session.usuarioLogueado,
          });
        }
        if (req.body.nuevacontrasena !== req.body.confirmarcontrasena) { //si las nuevas no coinciden
          return res.render("users/editarusuario", {
            title: "Editar Usuario",
            mensaje: "Las nuevas contraseñas no coinciden",
            userLogged: req.session.usuarioLogueado,
          });
        }
        //si todo esta bien, actualizo la contraseña
        usuarioLogueado.password = bycripts.hashSync(req.body.nuevacontrasena,10);
      }

      //edito los demas campos, controlo que no esten vacios los que capitalizan sino da error
      const nombre = req.body.nombre?.trim();
      const apellido = req.body.apellido?.trim();
      const direccion = req.body.direccion?.trim();

      if (!nombre || !apellido || !direccion) { //si alguno esta vacio o solo espacios
        return res.render("users/editarusuario", {
          title: "Editar Usuario",
          mensaje: "No dejar campos vacios o solamente con espacios",
          userLogged: req.session.usuarioLogueado,
        });
      }
      usuarioLogueado.name = capitalizar(req.body.nombre);
      usuarioLogueado.lastname = capitalizar(req.body.apellido);
      usuarioLogueado.numberphone = req.body.telefono;
      usuarioLogueado.address = capitalizar(req.body.direccion);
      if (req.file) { //si subio un nuevo avatar
        usuarioLogueado.avatar = req.file.filename;
      }
      await usuarioLogueado.save(); //guardo los cambios en la base de datos
      req.session.usuarioLogueado = {
        //actualizo la session sin la contraseña
        ...usuarioLogueado.toJSON(),
        password: undefined,
      };

      //HACER ADMIN A OTRO USUARIO :::: con base de datos
      //no controlo que esten vacios porque son campos opcionales (trim)
      if (req.body.usergod && req.body.emailgod && req.body.divinepass) {
        //si completo los 3 campos
        const dios = await db.User.findOne({where: { username: req.body.usergod, email: req.body.emailgod },}); //busco el usuario por nombre y email
        if (!dios) { //si no lo encuentra
          return res.render("users/editarusuario", {
            title: "Editar Usuario",
            mensaje: "El usuario o email del futuro Dios no existen",
            userLogged: req.session.usuarioLogueado,
          });
        }
        if (usuarioLogueado.role !== "admin") { //si no es admin (por si acaso, porque en realidad no ve el form)
          return res.render("users/editarusuario", {
            title: "Editar Usuario",
            mensaje: "Accion no permitida",
            userLogged: req.session.usuarioLogueado,
          });
        }
        // Validar contraseña del administrador
        const contrasenaDivinaCorrecta = bycripts.compareSync(
          req.body.divinepass,
          usuarioLogueado.password
        );
        if (!contrasenaDivinaCorrecta) { //si la clave divina es incorrecta
          return res.render("users/editarusuario", {
            title: "Editar Usuario",
            mensaje: "Contraseña Divina incorrecta",
            userLogged: req.session.usuarioLogueado,
          });
        }
        // Si todo es correcto, hacer admin al usuario
        dios.role = "admin";
        await dios.save(); //guardo el cambio en la base de datos
      }
      res.redirect("/users/perfil");
    } catch (error) {
      return res.status(500).send("Error al actualizar el usuario"); //error servidor
    }
  },

  //::::: CERRAR SESION :::::
  cerrarsesion: function (req, res) {
    req.session.destroy(); //destruyo la session
    res.clearCookie("usuarioEmail"); //limpio la cookie
    return res.redirect("/");
  },

  //::::: ELIMINAR USUARIO VISTA :::::
  eliminarUsuarioVista: function (req, res, next) {
    res.render("users/eliminarusuario.ejs", {
      title: "Eliminar Usuario",
      mensaje:"¿Estás seguro que deseas eliminar tu cuenta? Esta acción es irreversible.",});
  },

  //::::: ELIMINAR USUARIO LOGICA ::::: con base de datos
  eliminarUsuarioDB: async function (req, res, next) {
    try {
      const usuarioLogueado = await db.User.findByPk(req.session.usuarioLogueado.id); //busco el usuario por su id
      if (!usuarioLogueado) {
        return res.status(404).send("Usuario no encontrado");
      } 
      // Validar las 3 condiciones
      if (usuarioLogueado.email !== req.body.email || //el email no coincide
        !bycripts.compareSync(req.body.contrasena, usuarioLogueado.password) || //la contraseña no coincide
        req.body.seguro !== "on" //no marco la casilla de seguro
      ) {
        return res.render("users/eliminarusuario", {
          //cualquiera que falle de esas 3 condiciones manda mensaje de error
          title: "Eliminar Usuario",
          mensaje:
            "Debe completar los datos correctamente para eliminar su cuenta",
        });
      }
      // si todo esta bien, elimino primero el avatar si no es el por defecto
      if (usuarioLogueado.avatar &&usuarioLogueado.avatar !== "sinavatar.png") {
        const avatarPath = path.join(__dirname,"../public/images/users",usuarioLogueado.avatar); //ruta del avatar
        if (fs.existsSync(avatarPath)) { // Verificar que el archivo existe
          fs.unlinkSync(avatarPath); // Eliminar el archivo
        }
      }
      await usuarioLogueado.destroy(); // Eliminar el usuario de la base de datos
      // Cerrar sesion y limpiar cookie
      req.session.destroy(() => {
        //destruyo la session y espero a que termine
        res.clearCookie("usuarioEmail");
        res.redirect("/");
      });
    } catch (error) {
      return res.render("users/eliminarusuario", {
        title: "Eliminar Usuario",
        mensaje:
          "Ocurrio un error al intentar eliminar la cuenta. Intente nuevamente.",
      });
    }
  },
};

module.exports = userController;
