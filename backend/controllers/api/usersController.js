const fs = require("fs"); //file system
const path = require("path"); // manejar las rutas
//const bycripts = require("bcryptjs"); // encriptar contraseñas
const { v4: uudi } = require("uuid"); // generar ids unicos

const usersPath = path.join(__dirname, "../data/users.json"); // ruta al archivo de usuarios

const db = require("../../database/models/index.js"); // Base de datos (sequelize)
const { count, profile } = require("console");

const userController = {

  // USUARIO POR PK
  profile: async function (req, res, next) {
    try {
      let response; // variable para armar la respuesta
      const userId = req.params.id; // obtengo el id del usuario de los parametros de la url
      const usuarioEncontrado = await db.User.findByPk( userId, // busco el usuario por su pk
        { attributes: { exclude: ["password"] } } //excluyo la contraseña
      ); 
      if (!usuarioEncontrado) { //si no lo encuentra
        response = {
          meta: {
            status: 404,
            path: `/api/users/${userId}`, //ruta del endpoint
          },
          message: `Error al buscar el usuario con id ${userId}`,
        };
      }
      response = { //armo la respuesta
        meta: {
          status: 200, //estado ok
          path: `/api/users/${userId}`, //ruta del endpoint
        },
        data: usuarioEncontrado, //datos del usuario encontrado
      };

      res.json(response); //envio la respuesta en formato json
    } catch (error) {
      return res.status(500).json({ //error servidor
        meta: {
          status: 500,
          path: `/api/users/${userId}`,
        },
        message: "Error al procesar la solicitud",
      });
    }
  },

// OBTENER USUARIOS CON PAGINACION
allUsers: async function (req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1; // pagina actual
    const limit = parseInt(req.query.limit) || 3; //usuarios por pagin
    const offset = (page - 1) * limit; //calculo del offset (desplazamiento)

    const { rows: users, count } = await db.User.findAndCountAll({ // busco y cuento todos los usuarios
      attributes: { exclude: ["password"] }, // excluyo la contraseña
      limit: limit, // limite de usuarios por pagina
      offset: offset, // desplazamiento
      order: [["id", "ASC"]] // odernar por id ascendente
    });

    const totalPages = Math.ceil(count / limit); //calculo del total de paginas

    res.json({
      meta: {
        status: 200,
        total: count, // total de usuarios
        page: page,
        limit: limit,
        pages: totalPages, // total de paginas
        path: "/api/users"
      },
      data: users
    });
  } catch (error) { // error servidor
    return res.status(500).send("Error al procesar la solicitud");
  }
},


// OBTENER ULTIMO USUARIO
lastUser: async function (req, res) {
  try {
    const ultimoUsuario = await db.User.findOne({ // busco el ultimo usuario
      attributes: { exclude: ["password"] }, // excluyo la contraseña
      order: [["id", "DESC"]],   // ordenamos por id descendente (ultimo primero)
    });

    if (!ultimoUsuario) { // si no hay usuarios
      return res.status(404).json({
        meta: { status: 404 },
        message: "No hay usuarios en la base de datos"
      });
    }

    return res.json({ // envio la respuesta
      meta: { status: 200,
        path: "/api/users/last"
      },
      data: ultimoUsuario, // datos del ultimo usuario
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
