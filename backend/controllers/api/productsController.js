const fs = require("fs"); //file system
const path = require("path"); // manejar las rutas
const { v4: uudi } = require("uuid"); // generar ids unicos

const productsPath = path.join(__dirname, "../data/products.json"); // ruta al archivo de productos
const colorsPath = path.join(__dirname, "../data/colors.json"); // ruta al archivo de colores
const modelsPath = path.join(__dirname, "../data/models.json"); // ruta a los modelos

const db = require("../../database/models/index.js"); // Base de datos (sequelize)
const { Op } = require("sequelize"); // Operadores de Sequelize

// funcion para capitalizar strings
function capitalizar(str) {
  if (!str) return "";
  str = str.trim();
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const productsController = {
  // PRODUCTO POR PK
  productDetail: async function (req, res, next) {
    try {
      const productId = req.params.id; //id del producto desde la URL

      const productoEncontrado = await db.Product.findByPk(productId, { //busco prod por PK
        include: [ // relaciones
          { association: "images" },
          { association: "colors" },
          { association: "model" },
        ],
      });

      if (!productoEncontrado) { // si no existe
        return res.status(404).json({
          meta: {
            status: 404,
            path: `/api/products/${productId}`, // ruta del endpoint
          },
          message: `No se encontro el producto con id ${productId}`,
        });
      }
      // Formatear producto
      const productFormatted = {
        id: productoEncontrado.id, 
        name: productoEncontrado.name,
        description: productoEncontrado.description,
        price: productoEncontrado.price,
        size: productoEncontrado.size,
        stock: productoEncontrado.stock,
        featured: productoEncontrado.featured,

        image:
          productoEncontrado.images?.length > 0 // si tiene imagenes
            ? `/images/products/${productoEncontrado.images[0].name}` // primera imagen
            : "/images/products/lamperror.png", // imagen por defecto

        colors: productoEncontrado.colors, 
        model: productoEncontrado.model,
      };

      return res.json({ // respuesta exitosa
        meta: {
          status: 200,
          path: `/api/products/${productId}`, // ruta del endpoint
        },
        data: productFormatted, // producto formateado
      });
    } catch (error) { // error en el proceso
      return res.status(500).json({
        meta: {
          status: 500,
          path: `/api/products/${productId}`,
        },
        message: "Error al procesar la solicitud",
      });
    }
  },

// OBTENER PRODUCTOS CON PAGINADO
allProducts: async function (req, res) {
  try {
    const page = parseInt(req.query.page) || 1; // pagina actual
    const limit = parseInt(req.query.limit) || 6; // productos por pagina
    const offset = (page - 1) * limit; // calcular offset (desplazamiento)

    const totalProducts = await db.Product.count(); // total de productos

    const products = await db.Product.findAll({ // obtener productos con relaciones
      include: [
        { association: "images" },
        { association: "colors" },
        { association: "model" },
      ],
      limit: limit, // limite por pagina
      offset: offset, // desplazamiento
    });

    const productsFormatted = products.map((p) => ({ // formatear productos
      id: p.id,
      name: p.name,
      description: p.description,
      price: p.price,
      size: p.size,
      stock: p.stock,
      featured: p.featured,
      image:
        p.images && p.images.length > 0 // si tiene imagenes
          ? `/images/products/${p.images[0].name}` // primera imagen
          : "/images/products/lamperror.png",
      colors: p.colors,
      model: p.model,
    }));

    return res.json({ // respuesta exitosa
      meta: {
        status: 200,
        total: totalProducts,
        page: page,
        limit: limit,
        pages: Math.ceil(totalProducts / limit), // total de paginas
        path: `/api/products`,
      },
      data: productsFormatted, // productos formateados
    });
  } catch (error) { // error en el proceso
    console.log(error);
    return res.status(500).send("Error al procesar la solicitud");
  }
},

  // OBTENER MODELOS Y COLORES
  modelsAndColors: async (req, res) => {
    try {
      const colors = await db.Color.findAll({ order: [["id", "ASC"]] }); // obtener colores ordenados por id
      const models = await db.Model.findAll({ order: [["id", "ASC"]] }); // obtener modelos ordenados por id
      return res.status(200).json({ // respuesta exitosa
        ok: true,
        data: { colors, models }, // devolver colores y modelos
      });
    } catch (error) { // error en el proceso
      console.log(error);
      return res.status(500).json({
        ok: false,
        msg: "Error al obtener los modelos y colores",
      });
    }
  },

  // AGREGAR COLOR
  addColor: async (req, res) => {
    try {
      const { name } = req.body; // obtener nombre del body
      if (!name || name.trim() === "") { // validar nombre
        return res.status(400).json({ // respuesta de error
          ok: false,
          msg: "El nombre del color es obligatorio",
        });
      }
      const newColor = await db.Color.create({ name: capitalizar(name) }); // crear nuevo color
      return res.status(201).json({ // respuesta exitosa
        ok: true,
        data: newColor, // devolver nuevo color
      });
    } catch (error) { // error en el proceso
      console.log(error);
      return res.status(500).json({
        ok: false,
        msg: "Error al agregar el color",
      });
    }
  },

  // AGREGAR MODELO
  addModel: async (req, res) => {
    try {
      const { name } = req.body; // obtener nombre del body
      if (!name || name.trim() === "") { // validar nombre
        return res.status(400).json({ // respuesta de error
          ok: false,
          msg: "El nombre del modelo es obligatorio",
        });
      }
      const newModel = await db.Model.create({ name: capitalizar(name) }); // crear nuevo modelo
      return res.status(201).json({ // respuesta exitosa
        ok: true,
        data: newModel, // devolver nuevo modelo
      });
    } catch (error) { // error en el proceso
      console.log(error);
      return res.status(500).json({
        ok: false,
        msg: "Error al agregar el modelo",
      });
    }
  },

// OBTENER ULTIMO PRODUCTO
lastProduct: async function (req, res) {
  try {
    const ultimoproducto = await db.Product.findOne({ // buscar ultimo producto
      order: [["id", "DESC"]], // ordenar por id descendente
      include: [ // incluir relaciones
        { association: "images" },
        { association: "colors" },
        { association: "model" },
      ],
    });

    if (!ultimoproducto) { // si no hay productos
      return res.status(404).json({
        meta: { status: 404 },
        message: "No hay productos en la base de datos",
      });
    }

    const productFormatted = { // formatear producto
      id: ultimoproducto.id,
      name: ultimoproducto.name,
      description: ultimoproducto.description,
      price: ultimoproducto.price,
      size: ultimoproducto.size,
      stock: ultimoproducto.stock,
      featured: ultimoproducto.featured,

      image:
        ultimoproducto.images?.length > 0 // si tiene imagenes
          ? `/images/products/${ultimoproducto.images[0].name}` // primera imagen
          : "/images/products/lamperror.png", // imagen por defecto

      colors: ultimoproducto.colors,
      model: ultimoproducto.model,
    };

    return res.json({ // respuesta exitosa
      meta: {
        status: 200,
        path: "/api/products/last",
      },
      data: productFormatted, // producto formateado
    });
  } catch (error) { // error en el proceso
    console.log(error);
    return res.status(500).json({
      meta: { status: 500 },
      message: "Error al procesar la solicitud",
    });
  }
},

};

module.exports = productsController;
