const fs = require("fs"); //file system
const path = require("path"); // manejar las rutas
const { v4: uudi } = require("uuid"); // generar ids unicos

const productsPath = path.join(__dirname, "../data/products.json"); // ruta al archivo de productos
const colorsPath = path.join(__dirname, "../data/colors.json"); // ruta al archivo de colores
const modelsPath = path.join(__dirname, "../data/models.json"); // ruta a los modelos

const db = require("../database/models/index.js"); // Base de datos (sequelize)

// funcion para capitalizar strings
function capitalizar(str) {
  if (!str) return "";
  str = str.trim();
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const productsController = {
  //:::::VER PRODUCTOS::::: con base de datos
  productos: async function (req, res) {
    //async porque usa await
    try {
      const productsdb = await db.Product.findAll({
        //trae todos los productos de la base de datos
        include: [
          //alias dentro de los asocciate en Product.js
          { association: "model" },
          { association: "colors" },
          { association: "images" },
        ],
      });

      return res.render("products/productos", { productsdb });
    } catch (error) {
      //manejo de errores
      console.error(error);
      return res.status(500).send("Error al traer los productos");
    }
  },

  //:::::VER PRODUCTOS EN DETALLE::::: con base de datos
  enviarProductos: async function (req, res) {
    try {
      const idProducto = req.params.id;
      const productodb = await db.Product.findByPk(idProducto, { //busca el producto por su id
        include: [
          //alias dentro de los asocciate en Product.js
          { association: "model" },
          { association: "colors" },
          { association: "images" },
        ],
      });
      if (!productodb) { // si no encuentra el producto
        return res.status(404).send("Producto no encontrado");
      }
      // si lo encuentra, renderiza la vista detalle y le pasa el producto
      return res.render("products/detalle", { productodb });
    } catch (error) { //manejo de errores
      console.error(error);
      return res.status(500).send("Error al traer el producto");
    }
  },

  //:::::VER VISTA DE CREAR PRODUCTOS::::: con base de datos
  crearProductosVista: async function (req, res, next) {
    try {
      const colorsdb = await db.Color.findAll({order: [["id", "ASC"]],}); //busca y ordena los colores
      const modelsdb = await db.Model.findAll({order: [["id", "ASC"]],}); //busca y ordena los modelos

      return res.render("products/crearprod", { colorsdb, modelsdb }); //renderiza la vista y le pasa colores y modelos
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error al traer los colores o modelos");
    }
  },

  //:::::LOGICA PARA CREAR PRODUCTOS NUEVOS::::: con base de datos
  crearProductosBD: async function (req, res) {
    try {
      const nuevoProducto = {
        name: req.body.nombre,
        description: req.body.descripcion,
        modelId: parseInt(req.body.modeloId), // convierte el id del modelo a entero
        price: parseFloat(req.body.precio),
        size: req.body.tamano,
        stock: parseInt(req.body.stock),
        featured: req.body.destacado === "SI", // verifica si el producto es destacado
      };
      const productoCreado = await db.Product.create(nuevoProducto); // crea el nuevo producto en la base de datos
      if (req.body.color) { // si selecciono colores
        const colorIds = Array.isArray(req.body.color) // si selecciono varios colores
          ? req.body.color.map((c) => parseInt(c)) // paso a enteros
          : [parseInt(req.body.color)]; // si selecciono un solo color
        await productoCreado.setColors(colorIds); // asocia los colores al producto con la asociacion belongsToMany en Product.js
      }
      if (req.files && req.files.length > 0) { // si se subieron imagenes
        const imagenes = req.files.map((f) => ({ // mapea las imagenes subidas
          productId: productoCreado.id,
          name: f.filename,
        }));
        await db.ProdImage.bulkCreate(imagenes); // crea las imagenes en la base de datos
      } else { 
        await db.ProdImage.create({ // si no se subieron imagenes asignar la imagen por defecto
          productId: productoCreado.id,
          name: "lamperror.png",
        });
      }
      res.redirect("/products/productos"); // redirige a la lista de productos
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error al crear el producto");
    }
  },

  //:::::VER VISTA DE EDITAR PRODUCTOS::::: con base de datos
  editarProductosVista: async function (req, res, next) {
    try {
      const colorsdb = await db.Color.findAll({order: [["id", "ASC"]],}); //busca y ordena los colores
      const modelsdb = await db.Model.findAll({order: [["id", "ASC"]],}); //busca y ordena los modelos
      const idProducto = req.params.id; //id del producto a editar
      const productodb = await db.Product.findByPk(idProducto, { //busca el producto por su id
        include: [
          { association: "model" },
          { association: "colors" },
          { association: "images" },
        ],
      });
      if (!productodb) { // si no encuentra el producto
        return res.status(404).send("Producto no encontrado");
      }
      return res.render("products/editarprod", {
        productodb, //mando el product
        colorsdb, //mando los colores
        modelsdb, //mando los modelos
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error al traer el producto, colores o modelos");
    }
  },

  //:::::LOGICA PARA EDITAR PRODUCTOS::::: con base de datos
  editarProductosBD: async function (req, res) {
    try {
      const idProducto = req.params.id;
      const producto = await db.Product.findByPk(idProducto); //busca el producto por su id
      if (!producto) { // si no encuentra el producto
        return res.status(404).send("Producto no encontrado");
      }

      // actualizar los campos principales
      producto.name = req.body.nombre;
      producto.description = req.body.descripcion;
      producto.modelId = parseInt(req.body.modeloId); // convierte el id del modelo a entero
      producto.price = parseFloat(req.body.precio); // convierte el precio a float
      producto.size = req.body.tamano;
      producto.stock = parseInt(req.body.stock); // convierte el stock a entero
      producto.featured = req.body.destacado === "SI";
      await producto.save(); // guarda los cambios en la base de datos

      let colorIds;
      if (req.body.colorIdVista) { // si selecciono colores
        colorIds = Array.isArray(req.body.colorIdVista) // si selecciono varios colores
          ? req.body.colorIdVista.map((c) => parseInt(c)) // convierte a enteros
          : [parseInt(req.body.colorIdVista)]; // si selecciono un solo color
      } else { // si no selecciono ningun color
        colorIds = [1]; // id del color "ninguno" por defectp
      }
      await producto.setColors(colorIds); // actualiza la asociacion belongsToMany en Product.js

      if (req.files && req.files.length > 0) { // si se subieron nuevas imagenes
        await db.ProdImage.destroy({ where: { productId: producto.id } }); // elimina las imagenes existentes
        const imagenes = req.files.map((f) => ({ // mapea las nuevas imagenes
          productId: producto.id,
          name: f.filename,
        }));
        await db.ProdImage.bulkCreate(imagenes); // crea las nuevas imagenes
      }

      res.redirect(`/products/detalle/${producto.id}`); // redirige al detalle del producto editado
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error al actualizar el producto");
    }
  },

  //:::::LOGICA PARA ELIMINAR PRODUCTOS::::: con base de datos
  eliminarProductosBD: async function (req, res) {
    try {
      const idProducto = req.params.id;
      const producto = await db.Product.findByPk(idProducto); //busca el producto por su id
      if (!producto) { // si no encuentra el producto
        return res.status(404).send("Producto no encontrado");
      }
      await db.ProdImage.destroy({ where: { productId: producto.id } }); // elimina las imagenes asociadas
      await producto.setColors([]); // elimina las asociaciones con colores
      await producto.destroy(); // elimina el producto
      res.redirect("/products/productos"); // redirige a la lista de productos
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error al eliminar el producto");
    }
  },

  //:::::VER VISTA DE EDITAR PROPIEDADES DE PRODUCTOS::::: con base de datos
  editarPropiedadesVista: async function (req, res, next) {
    try {
      const colorsdb = await db.Color.findAll({order: [["id", "ASC"]],}); //busca y ordena los colores
      const modelsdb = await db.Model.findAll({order: [["id", "ASC"]],}); //busca y ordena los modelos
      return res.render("products/editarPropiedad", { colorsdb, modelsdb }); //paso los colores y modelos a la vista
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error al traer los colores o modelos");
    }
  },

  //:::::LOGICA PARA EDITAR PROPIEDADES DE PRODUCTOS::::: con base de datos
  editarPropiedadesBD: async function (req, res) {
    try {
      //AGREGAR MODELO
      if (req.body.nombreModelo && req.body.nombreModelo.trim() !== "") { // si se envio un nuevo modelo y no esta vacio
        const nuevoModelo = {
          name: capitalizar(req.body.nombreModelo), // capitaliza el nombre
        };
        await db.Model.create(nuevoModelo); // crea el nuevo modelo en la base de datos
      }
      //AGREGAR COLOR
      if (req.body.nombreColor && req.body.nombreColor.trim() !== "") { // si se envio un nuevo color y no esta vacio
        const nuevoColor = {
          name: capitalizar(req.body.nombreColor), // capitaliza el nombre
        };
        await db.Color.create(nuevoColor); // crea el nuevo color en la base de datos
      }
      //ELIMINAR MODELO
      if (req.body.modeloIds) { // si se seleccionaron modelos para eliminar
        let modeloSeleccionados = req.body.modeloIds; // array de ids seleccionados
        if (!Array.isArray(modeloSeleccionados)) { // si solo selecciono uno, convertir a array
          modeloSeleccionados = [modeloSeleccionados];
        }
        modeloSeleccionados = modeloSeleccionados.map((c) => parseInt(c)); // convertir a enteros
        // Recorrer todos los productos y reemplazar los modelos eliminados con 1 (solo se puede elegir un modelo)
        const productos = await db.Product.findAll(); // trae todos los productos
        for (const producto of productos) { // recorro
          if (modeloSeleccionados.includes(producto.modelId)) { // si el modelo esta para eliminar
            producto.modelId = 1; // id del modelo "ninguno"
            await producto.save(); // guardo el cambio
          }
        }
        await db.Model.destroy({ where: { id: modeloSeleccionados } }); // elimina los modelos seleccionados de su tabla
      }
      // ELIMINAR COLOR
      if (req.body.colorIds) { // si se seleccionaron colores para eliminar
        let coloresSeleccionados = req.body.colorIds; // array de ids seleccionados
        if (!Array.isArray(coloresSeleccionados)) { // si solo selecciono uno convertir en array
          coloresSeleccionados = [coloresSeleccionados];
        }
        coloresSeleccionados = coloresSeleccionados.map((c) => parseInt(c)); // convertir a enteros
        // Recorrer todos los productos y limpiar los colores eliminados
        const productos = await db.Product.findAll({ // trae todos los productos
          include: [{ association: "colors" }],
        });
        for (const producto of productos) { // recorro
          const coloresActuales = producto.colors.map((c) => c.id); // ids de los colores actuales del producto
          const nuevosColores = coloresActuales.filter( // filtrar los colores
            (id) => !coloresSeleccionados.includes(id) // quitar los eliminados
          );
          // Si queda vacio, asignar id 1 (ninguno)
          if (nuevosColores.length === 0) {
            await producto.setColors([1]); // id del color "ninguno"
          } else {
            await producto.setColors(nuevosColores); // actualizar los colores del producto
          }
        }
        await db.Color.destroy({ where: { id: coloresSeleccionados } }); // elimina los colores seleccionados
      }
      res.redirect("/products/productos"); // redirige a la lista de productos
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error al editar las propiedades");
    }
  },
};

module.exports = productsController;
