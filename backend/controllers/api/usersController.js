const fs = require("fs"); //file system
const path = require("path"); // manejar las rutas
//const bycripts = require("bcryptjs"); // encriptar contraseñas
const { v4: uudi } = require("uuid"); // generar ids unicos

const usersPath = path.join(__dirname, "../data/users.json"); // ruta al archivo de usuarios

const db = require("../../database/models/index.js"); // Base de datos (sequelize)
const { count, profile } = require("console");

// funcion utilitaria para capitalizar strings
function capitalizar(str) {
  if (!str) return "";
  str = str.trim();
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const userController = {
  //::::: ACCEDER A LA CUENTA || LOGIN ::::: con base de datos
  //!PENDIENTE DE REVISAR
  // procesarLogin: async function (req, res, next) {
  //   try {
  //     const usuarioEncontrado = await db.User.findOne({ where: { email: req.body.usuario },}); //busco el usuario por su email
  //     if (!usuarioEncontrado) { //si no lo encuentra
  //       return res.render("users/registro.ejs", {
  //         title: "Registro",
  //         mensaje: "El correo no esta registrado",
  //       });
  //     }
  //     const contraseñaCorrecta = bycripts.compareSync( //comparo las contraseñas
  //       req.body.contrasena,
  //       usuarioEncontrado.password //la que esta en la base de datos
  //     );

  //     if (!contraseñaCorrecta) { //si la contraseña es incorrecta
  //       return res.render("users/registro.ejs", {
  //         title: "Registro",
  //         mensaje: "La contraseña es incorrecta",
  //       });
  //     }
  //     const { contrasena, ...usuarioSinPassword } = usuarioEncontrado.toJSON(); //elimino la contraseñs del objeto usuario
  //     req.session.usuarioLogueado = usuarioSinPassword; //creo la session sin la contraseña
  //     if (req.body.recordar) { //si marco casilla recordar
  //       res.cookie("usuarioEmail", usuarioEncontrado.email, { //creo la cookie
  //         maxAge: 3600000,
  //       });
  //     }
  //     res.redirect("/users/perfil");
  //   } catch (error) {
  //     return res.status(500).send("Error al procesar el login"); //error servidor
  //   }
  // },

  //::::: REGISTRARSE || USUARIO NUEVO ::::: con base de datos
  //!PENDIENTE DE REVISAR
  // procesarRegistro: async function (req, res, next) {
  //   try {
  //     const usuarioExistente = await db.User.findOne({where: { email: req.body.correo },}); //busco el usuario por su email
  //     if (usuarioExistente) { //si ya existe
  //       return res.render("users/registro.ejs", {
  //         title: "Registro",
  //         mensaje: "El correo ya esta registrado",
  //       });
  //     }
  //     const nombreUsuarioExiste = await db.User.findOne({where: { username: req.body.usuario },}); //busco por nombre de usuario
  //     if (nombreUsuarioExiste) { //si ya existe
  //       return res.render("users/registro.ejs", {
  //         title: "Registro",
  //         mensaje: "El nombre de usuario ya existe, elija otro por favor",
  //       });
  //     }
  //     if (req.body.contrasena1 !== req.body.contrasena2) { //si las contraseñas no coinciden
  //       return res.render("users/registro.ejs", {
  //         title: "Registro",
  //         mensaje: "Las contraseñas no coinciden",
  //       });
  //     } else { //si todo esta bien, creo el nuevo usuario
  //       const nuevoUsuario = {
  //         name: capitalizar(req.body.nombre), //capitalizo nombre y apellido
  //         lastname: capitalizar(req.body.apellido),
  //         email: req.body.correo,
  //         username: req.body.usuario,
  //         password: bycripts.hashSync(req.body.contrasena1, 10), //encripto la contraseña
  //         numberphone: req.body.telefono,
  //         address: capitalizar(req.body.direccion),
  //         role: "client", //por defecto todos son clientes
  //         avatar: req.file ? req.file.filename : "sinavatar.png", //si subio foto uso su nombre, sino el defaul
  //         registerday: new Date(),
  //       };
  //       await db.User.create(nuevoUsuario); //creo el usuario en la base de datos
  //       req.session.mensaje =
  //         " --> Cuenta creada exitosamente, intenta ingresar ahora"; //mensaje de exito y mando al home
  //       return res.redirect("/");
  //     }
  //   } catch (error) {
  //     return res.status(500).send("Error al procesar el registro"); //error servidor
  //   }
  // },

  //::::: PERFIL USUARIO :::::
  //!PENDIENTE DE REVISAR
  // vistaPerfil: function (req, res, next) {
  //   res.render("users/perfil.ejs", {
  //     title: "Perfil",
  //     usuario: req.session.usuarioLogueado, //paso los datos del usuario logueado a la vista
  //   });
  // },

  //::::: EDITAR USUARIO VISTA :::::
  // editarUsuarioVista: function (req, res, next) {
  //   res.render("users/editarusuario.ejs", {
  //     userLogged: req.session.usuarioLogueado, //paso los datos del usuario logueado a la vista
  //     title: "Editar Usuario",
  //     mensaje: "", //mensaje vacio al cargar la vista por navegacion
  //   });
  // },

  //::::: EDITAR USUARIO LOGICA ::::: con base de datos
  // editarUsuarioDB: async function (req, res, next) {
  //   try {
  //     const usuarioLogueado = await db.User.findByPk(req.session.usuarioLogueado.id); //busco el usuario por su id
  //     if (!usuarioLogueado) { //si no lo encuentra
  //       return res.status(404).send("Usuario no encontrado");
  //     }
  //     if (req.body.usuario && req.body.usuario !== usuarioLogueado.username) { //si completo y es diferente al actual
  //       const nombreExiste = await db.User.findOne({where: { username: req.body.usuario },}); //busco por nombre de usuario
  //       if (nombreExiste) {
  //         return res.render("users/editarusuario", {
  //           title: "Editar Usuario",
  //           mensaje: "El nombre de usuario ya esta en uso",
  //           userLogged: req.session.usuarioLogueado, //mantengo los datos en la vista
  //         });
  //       }
  //       // si todo esta bien, actualizo el nombre de usuario
  //       usuarioLogueado.username = req.body.usuario;
  //     }

  //     //edito los demas campos, controlo que no esten vacios los que capitalizan sino da error
  //     const nombre = req.body.nombre?.trim();
  //     const apellido = req.body.apellido?.trim();
  //     const direccion = req.body.direccion?.trim();

  //     if (!nombre || !apellido || !direccion) { //si alguno esta vacio o solo espacios
  //       return res.render("users/editarusuario", {
  //         title: "Editar Usuario",
  //         mensaje: "No dejar campos vacios o solamente con espacios",
  //         userLogged: req.session.usuarioLogueado,
  //       });
  //     }
  //     usuarioLogueado.name = capitalizar(req.body.nombre);
  //     usuarioLogueado.lastname = capitalizar(req.body.apellido);
  //     usuarioLogueado.numberphone = req.body.telefono;
  //     usuarioLogueado.address = capitalizar(req.body.direccion);
  //     if (req.file) { //si subio un nuevo avatar
  //       usuarioLogueado.avatar = req.file.filename;
  //     }
  //     await usuarioLogueado.save(); //guardo los cambios en la base de datos
  //     req.session.usuarioLogueado = {
  //       //actualizo la session sin la contraseña
  //       ...usuarioLogueado.toJSON(),
  //       password: undefined,
  //     };
  //     res.redirect("/users/perfil");

  //   } catch (error) {
  //     return res.status(500).send("Error al actualizar el usuario"); //error servidor
  //   }
  // },

  //::::: ELIMINAR USUARIO VISTA :::::
  // eliminarUsuarioVista: function (req, res, next) {
  //   res.render("users/eliminarusuario.ejs", {
  //     title: "Eliminar Usuario",
  //     mensaje:"¿Estás seguro que deseas eliminar tu cuenta? Esta acción es irreversible.",});
  // },

  //::::: ELIMINAR USUARIO LOGICA ::::: con base de datos
  // eliminarUsuarioDB: async function (req, res, next) {
  //   try {
  //     const usuarioLogueado = await db.User.findByPk(req.session.usuarioLogueado.id); //busco el usuario por su id
  //     if (!usuarioLogueado) {
  //       return res.status(404).send("Usuario no encontrado");
  //     }
  //     // Validar las 3 condiciones
  //     if (usuarioLogueado.email !== req.body.email || //el email no coincide
  //       !bycripts.compareSync(req.body.contrasena, usuarioLogueado.password) || //la contraseña no coincide
  //       req.body.seguro !== "on" //no marco la casilla de seguro
  //     ) {
  //       return res.render("users/eliminarusuario", {
  //         //cualquiera que falle de esas 3 condiciones manda mensaje de error
  //         title: "Eliminar Usuario",
  //         mensaje:
  //           "Debe completar los datos correctamente para eliminar su cuenta",
  //       });
  //     }
  //     // si todo esta bien, elimino primero el avatar si no es el por defecto
  //     if (usuarioLogueado.avatar &&usuarioLogueado.avatar !== "sinavatar.png") {
  //       const avatarPath = path.join(__dirname,"../public/images/users",usuarioLogueado.avatar); //ruta del avatar
  //       if (fs.existsSync(avatarPath)) { // Verificar que el archivo existe
  //         fs.unlinkSync(avatarPath); // Eliminar el archivo
  //       }
  //     }
  //     await usuarioLogueado.destroy(); // Eliminar el usuario de la base de datos
  //     // Cerrar sesion y limpiar cookie
  //     req.session.destroy(() => {
  //       //destruyo la session y espero a que termine
  //       res.clearCookie("usuarioEmail");
  //       res.redirect("/");
  //     });
  //   } catch (error) {
  //     return res.render("users/eliminarusuario", {
  //       title: "Eliminar Usuario",
  //       mensaje:
  //         "Ocurrio un error al intentar eliminar la cuenta. Intente nuevamente.",
  //     });
  //   }
  // },

  // USUARIO POR PK
  profile: async function (req, res, next) {
    try {
      let response;
      const userId = req.params.id;
      const usuarioEncontrado = await db.User.findByPk(
        userId, //busco el usuario por su id
        { attributes: { exclude: ["password"] } } //excluyo la contraseña
      ); 
      if (!usuarioEncontrado) {
        //si no lo encuentra
        response = {
          meta: {
            status: 404,
            path: `/api/users/${userId}`,
          },
          message: `Error al buscar el usuario con id ${userId}`,
        };
      }
      response = {
        //armo la respuesta
        meta: {
          status: 200, //estado ok
          path: `/api/users/${userId}`, //ruta del endpoint
        },
        data: usuarioEncontrado,
      };

      res.json(response); //envio la respuesta en formato json
    } catch (error) {
      return res.status(500).json({
        //error servidor
        meta: {
          status: 500,
          path: `/api/users/${userId}`,
        },
        message: "Error al procesar la solicitud",
      });
    }
  },

  // OBTENER TODOS LOS USUARIOS
  allUsers: async function (req, res, next) {
    try {
      const users = await db.User.findAll(
        //busco todos los usuarios
        { attributes: { exclude: ["password"] } }
      ); //excluyo la contraseña
      const response = {
        //armo la respuesta
        meta: {
          status: 200, //estado ok
          count: users.length, //cantidad de usuarios
          path: "/api/users", //ruta del endpoint
        },
        data: users,
      };

      res.json(response); //envio la respuesta en formato json
    } catch (error) {
      return res.status(500).send("Error al procesar la solicitud"); //error servidor
    }
  },

// OBTENER ULTIMO USUARIO
lastUser: async function (req, res) {
  try {
    const ultimoUsuario = await db.User.findOne({
      attributes: { exclude: ["password"] },
      order: [["id", "DESC"]],   // ordenamos por id descendente (ultimo primero)
    });

    if (!ultimoUsuario) {
      return res.status(404).json({
        meta: { status: 404 },
        message: "No hay usuarios en la base de datos"
      });
    }

    return res.json({
      meta: { status: 200,
        path: "/api/users/last"
      },
      data: ultimoUsuario,
    });

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      meta: { status: 500 },
      message: "Error al procesar la solicitud",
    });
  }
},

};

module.exports = userController;
