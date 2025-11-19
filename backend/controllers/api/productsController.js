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
      const productId = req.params.id;

      const productoEncontrado = await db.Product.findByPk(productId, {
        include: [
          { association: "images" },
          { association: "colors" },
          { association: "model" },
        ],
      });

      if (!productoEncontrado) {
        return res.status(404).json({
          meta: {
            status: 404,
            path: `/api/products/${productId}`,
          },
          message: `No se encontró el producto con id ${productId}`,
        });
      }

      // FORMATEO → SOLO PRIMERA IMAGEN
      const productFormatted = {
        id: productoEncontrado.id,
        name: productoEncontrado.name,
        description: productoEncontrado.description,
        price: productoEncontrado.price,
        size: productoEncontrado.size,
        stock: productoEncontrado.stock,
        featured: productoEncontrado.featured,

        // ⬇️ Primera imagen o fallback
        image:
          productoEncontrado.images?.length > 0
            ? `/images/products/${productoEncontrado.images[0].name}`
            : "/images/products/default.png",

        // ⬇️ Mantengo colores y modelo
        colors: productoEncontrado.colors,
        model: productoEncontrado.model,
      };

      return res.json({
        meta: {
          status: 200,
          path: `/api/products/${productId}`,
        },
        data: productFormatted,
      });
    } catch (error) {
      return res.status(500).json({
        meta: {
          status: 500,
          path: `/api/products/${productId}`,
        },
        message: "Error al procesar la solicitud",
      });
    }
  },

// OBTENER PRODUCTOS CON PAGINADO REAL
allProducts: async function (req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const offset = (page - 1) * limit;

    // 🔹 1) Contar productos SIN relations
    const totalProducts = await db.Product.count();

    // 🔹 2) Obtener productos CON relations
    const products = await db.Product.findAll({
      include: [
        { association: "images" },
        { association: "colors" },
        { association: "model" },
      ],
      limit: limit,
      offset: offset,
    });

    // 🔹 3) Formatear productos
    const productsFormatted = products.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      price: p.price,
      size: p.size,
      stock: p.stock,
      featured: p.featured,
      image:
        p.images && p.images.length > 0
          ? `/images/products/${p.images[0].name}`
          : "/images/products/default.png",
      colors: p.colors,
      model: p.model,
    }));

    return res.json({
      meta: {
        status: 200,
        total: totalProducts,
        page: page,
        limit: limit,
        pages: Math.ceil(totalProducts / limit),
        path: `/api/products`,
      },
      data: productsFormatted,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error al procesar la solicitud");
  }
},

  // OBTENER MODELOS Y COLORES
  modelsAndColors: async (req, res) => {
    try {
      const colors = await db.Color.findAll({ order: [["id", "ASC"]] });
      const models = await db.Model.findAll({ order: [["id", "ASC"]] });
      return res.status(200).json({
        ok: true,
        data: { colors, models },
      });
    } catch (error) {
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
      const { name } = req.body;
      if (!name || name.trim() === "") {
        return res.status(400).json({
          ok: false,
          msg: "El nombre del color es obligatorio",
        });
      }
      const newColor = await db.Color.create({ name: capitalizar(name) });
      return res.status(201).json({
        ok: true,
        data: newColor,
      });
    } catch (error) {
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
      const { name } = req.body;
      if (!name || name.trim() === "") {
        return res.status(400).json({
          ok: false,
          msg: "El nombre del modelo es obligatorio",
        });
      }
      const newModel = await db.Model.create({ name: capitalizar(name) });
      return res.status(201).json({
        ok: true,
        data: newModel,
      });
    } catch (error) {
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
      const ultimoproducto = await db.Product.findOne({
        order: [["id", "DESC"]],   // ordenamos por id descendente (ultimo primero)
      });
  
      if (!ultimoproducto) {
        return res.status(404).json({
          meta: { status: 404 },
          message: "No hay productos en la base de datos"
        });
      }
  
      return res.json({
        meta: { status: 200,
          path: "/api/products/last"
        },
        data: ultimoproducto,
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

module.exports = productsController;
