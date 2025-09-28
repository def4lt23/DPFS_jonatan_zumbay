const fs = require("fs"); //file system
const path = require("path"); // manejar las rutas
const bycripts = require("bcryptjs"); // encriptar contraseñas
const { v4: uudi } = require("uuid"); // generar ids unicos

const usersPath = path.join(__dirname, "../data/users.json"); // ruta al archivo de usuarios

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

  //::::: ACCEDER A LA CUENTA || LOGIN :::::
  procesarLogin: function (req, res, next) {
    const usuariosjs = JSON.parse(fs.readFileSync(usersPath, "utf-8"));
    const usuarioEncontrado = usuariosjs.find(
      (usuario) => usuario.email === req.body.usuario //busco el usuario por email
    );
    if (!usuarioEncontrado) {
      //si no lo encuentra
      return res.render("users/registro.ejs", {
        title: "Registro",
        mensaje: "El correo no esta registrado",
      });
    } else {
      const contraseñaCorrecta = bycripts.compareSync(
        //comparo contraseñas
        req.body.contrasena, //la que escribe en el form
        usuarioEncontrado.contrasena //la que esta en la base de datos
      );
      if (!contraseñaCorrecta) {
        //si no coinciden
        return res.render("users/registro.ejs", {
          title: "Registro",
          mensaje: "La contraseña es incorrecta",
        });
      } else {
        //si todo ok
        const { contrasena, ...usuarioSinPassword } = usuarioEncontrado; //destructuring para no guardar la contraseña en la session
        req.session.usuarioLogueado = usuarioSinPassword; //creo la session sin la contraseña

        if (req.body.recordar) {
          //si tildo el checkbox de recordar
          res.cookie("usuarioEmail", usuarioEncontrado.email, {
            //creo la cookie
            maxAge: 3600000,
          });
        }
        res.redirect("/users/perfil");
      }
    }
  },

  //::::: REGISTRARSE || USUARIO NUEVO :::::
  procesarRegistro: function (req, res, next) {
    const usuariosjs = JSON.parse(fs.readFileSync(usersPath, "utf-8"));

    const emailExiste = usuariosjs.some(
      (usuario) => usuario.email === req.body.correo //verifico si el email ya esta registrado
    );
    if (emailExiste) {
      //si ya existe
      return res.render("users/registro.ejs", {
        title: "Registro",
        mensaje: "El correo ya esta registrado",
      });
    }

    const nombreUsuarioExiste = usuariosjs.some(
      (usuario) => usuario.usuario === req.body.usuario //verifico si el nombre de usuario ya esta registrado
    );
    if (nombreUsuarioExiste) {
      //si ya existe
      return res.render("users/registro.ejs", {
        title: "Registro",
        mensaje: "El nombre de usuario ya existe, elija otro por favor",
      });
    }

    if (req.body.contrasena1 == req.body.contrasena2) {
      //verifico que las contraseñas coincidan
      const nuevoUsuario = {
        id: uudi(), //genero un id unico
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.correo,
        usuario: req.body.usuario,
        contrasena: bycripts.hashSync(req.body.contrasena1, 10), //encripto la contraseña
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        rol: "cliente", //por defecto todos son clientes
        avatar: req.file ? req.file.filename : "sinavatar.png", //si sube avatar lo guardo, sino le asigno uno por defecto
        fechaRegistro: new Date().toISOString(),
      };
      usuariosjs.push(nuevoUsuario);
      const usuariosJson = JSON.stringify(usuariosjs, null, 2);
      fs.writeFileSync(usersPath, usuariosJson, "utf-8");
      req.session.mensaje = ' --> Cuenta creada exitosamente, intenta ingresar ahora'; //mostrar mensaje en el index
      return res.redirect("/",); 
    } else {
      return res.render("users/registro.ejs", {
        //si las contraseñas no coinciden
        title: "Registro",
        mensaje: "Las contraseñas no coinciden",
      });
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

  //::::: EDITAR USUARIO LOGICA :::::
  editarUsuariojson: function (req, res, next) {
    const usuariosjs = JSON.parse(fs.readFileSync(usersPath, "utf-8"));

    const nombreExiste = usuariosjs.find( //verifico si el nombre de usuario ya esta en uso (no dejo editar email)
      (u) =>
        u.usuario === req.body.usuario &&
        u.id !== req.session.usuarioLogueado.id
    );
    if (nombreExiste) { //si ya existe
      return res.render("users/editarusuario", {
        title: "Editar Usuario",
        mensaje: "El nombre de usuario ya está en uso",
        userLogged: req.session.usuarioLogueado, //mantengo los datos del usuario logueado en la vista
      });
    }

    const usuariotemp = usuariosjs.find( //busco el usuario que esta logueado
      (u) => u.id == req.session.usuarioLogueado.id
    );

    if (usuariotemp) { //si lo encuentra
      if (req.body.nuevacontrasena || req.body.confirmarcontrasena) { //si quiere cambiar la contraseña
        if (!req.body.contrasena) { //si no escribe la actual
          return res.render("users/editarusuario", {
            title: "Editar Usuario",
            mensaje: "Escriba su contraseña actual para cambiarla",
            userLogged: req.session.usuarioLogueado,
          });
        }

        if (
          !bycripts.compareSync(req.body.contrasena, usuariotemp.contrasena) //me fijo si esta mal la clave actual
        ) {
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

        usuariotemp.contrasena = bycripts.hashSync( //si todo ok, encripto y actualizo la nueva
          req.body.nuevacontrasena,
          10
        );
      }
      // Actualizo otros campos
      usuariotemp.nombre = req.body.nombre;
      usuariotemp.apellido = req.body.apellido;
      usuariotemp.telefono = req.body.telefono;
      usuariotemp.direccion = req.body.direccion;
      usuariotemp.usuario = req.body.usuario;

      if (req.file) { //si sube nuevo avatar
        usuariotemp.avatar = req.file.filename;
      }
      // Actualizo la session
      req.session.usuarioLogueado = { ...usuariotemp, contrasena: undefined }; //no guardo la contraseña en la session
    }

    //::::: HACER ADMIN A OTRO USUARIO :::::
    if (req.body.usergod && req.body.emailgod && req.body.divinepass) { //si completo los 3 campos
      const dios = usuariosjs.find(
        (u) => u.usuario === req.body.usergod && u.email === req.body.emailgod //busco el usuario por nombre y email
      );

      if (!dios) { //si no lo encuentra
        return res.render("users/editarusuario", {
          title: "Editar Usuario",
          mensaje: "El usuario o email del futuro Dios no existen",
          userLogged: req.session.usuarioLogueado,
        });
      }

      const adminEncontrado = usuariosjs.find( //busco que el que hace la peticion sea admin
        (u) =>
          u.rol === "administrador" && u.id === req.session.usuarioLogueado.id
      );

      if (!adminEncontrado) { //si no es admin (por si acaso, porque en realidad no ve el form)
        return res.render("users/editarusuario", {
          title: "Editar Usuario",
          mensaje: "Accion no permitida",
          userLogged: req.session.usuarioLogueado,
        });
      }

      // Validar contraseña del administrador
      const contrasenaDivinaCorrecta = bycripts.compareSync(
        req.body.divinepass,
        adminEncontrado.contrasena
      );

      if (!contrasenaDivinaCorrecta) { //si la clave divina es incorrecta
        return res.render("users/editarusuario", {
          title: "Editar Usuario",
          mensaje: "Contraseña Divina incorrecta",
          userLogged: req.session.usuarioLogueado,
        });
      }
      // Si todo es correcto, hacer admin al usuario
      dios.rol = "administrador"; //use find para no tener que recorrer todo el array
    }

    const usuariosJson = JSON.stringify(usuariosjs, null, 2);
    fs.writeFileSync(usersPath, usuariosJson, "utf-8");

    res.redirect("/users/perfil");
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
      mensaje:
        "¿Estás seguro que deseas eliminar tu cuenta? Esta acción es irreversible.",
    });
  },

  //::::: ELIMINAR USUARIO LOGICA :::::
  eliminarUsuariojson: function (req, res, next) {
    const usuariosjs = JSON.parse(fs.readFileSync(usersPath, "utf-8"));
    const usuarioDelete = usuariosjs.find(
      (u) => u.id === req.session.usuarioLogueado.id //busco el usuario que hizo la peticion
    );

    // Validar que existe y que coincidan email y contraseña, aun no borro
    if (
      !usuarioDelete || //no encuentra usuario con ese id
      usuarioDelete.email !== req.body.email || //el email no coincide
      !bycripts.compareSync(req.body.contrasena, usuarioDelete.contrasena) || //la contraseña no coincide
      req.body.seguro !== "on" //no marco la casilla de seguro
    ) {
      return res.render("users/eliminarusuario", {
        //cualquiera que falle de esas 4 condiciones manda mensaje de error
        title: "Eliminar Usuario",
        mensaje:
          "Debe completar los datos correctamente para eliminar su cuenta",
      });
    }

    // Borrar avatar si no es el default
    if (usuarioDelete.avatar && usuarioDelete.avatar !== "sinavatar.png") {
      const avatarPath = path.join(
        __dirname,
        "../public/images/users",
        usuarioDelete.avatar
      );
      if (fs.existsSync(avatarPath)) {
        // Verificar que el archivo existe
        fs.unlinkSync(avatarPath); // Eliminar el archivo
      }
    }

    // Filtrar al usuario borrado
    const usuariosFiltrados = usuariosjs.filter(
      (u) => u.id !== usuarioDelete.id
    );
    fs.writeFileSync(
      usersPath,
      JSON.stringify(usuariosFiltrados, null, 2),
      "utf-8"
    ); // Guardar los cambios

    // Cerrar sesión y limpiar cookie
    req.session.destroy();
    res.clearCookie("usuarioEmail");

    res.redirect("/");
  },
};

module.exports = userController;
