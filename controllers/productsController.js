const fs = require("fs"); //file system
const path = require("path"); // manejar las rutas
const { v4: uudi } = require("uuid"); // generar ids unicos

const productsPath = path.join(__dirname, "../data/products.json"); // ruta al archivo de productos
const colorsPath = path.join(__dirname, "../data/colors.json"); // ruta al archivo de colores
const modelsPath = path.join(__dirname, "../data/models.json"); // ruta a los modelos

const db = require("../database/models/index.js"); // Base de datos (sequelize)

const productsController = {
  //:::::VER PRODUCTOS:::::
  productos: async function (req, res) { //async porque usa await
    try {
      const productsdb = await db.Product.findAll({ //trae todos los productos de la base de datos
        include: [ //alias dentro de los asocciate en Product.js
          { association: "model" },
          { association: "colors" }, 
          { association: "images" }, 
        ],
      });

      return res.render("products/productos", { productsdb }); 
    } catch (error) { //manejo de errores
      console.error(error);
      return res.status(500).send("Error al traer los productos");
    }
  },

  //:::::VER PRODUCTOS POR DETALLE (ID):::::
  enviarProductos: function (req, res, next) {
    const productosjs = JSON.parse(fs.readFileSync(productsPath, "utf-8")); //productos a js
    const colors = JSON.parse(fs.readFileSync(colorsPath, "utf-8")); //colores a js

    const idProducto = req.params.id; // <-- el id que viene desde la URL
    const productoEncontrado = productosjs.find((p) => p.id == idProducto); // busca por id

    if (!productoEncontrado) {
      //si no lo encuentra
      return res.render("products/detalle", { miProducto: productoEncontrado }); //de momento funciona. Corregir despues, porque si elimino esto da error en colorid abajo
    }

    // Mapear los colorIds del producto a los nombres de colores
    const colorNombres = productoEncontrado.colorIds.map((id) => {
      const color = colors.find((c) => c.id === id);
      return color ? color.nombre : "Color desconocido";
    });

    res.render("products/detalle", {
      miProducto: productoEncontrado, //si lo encuentra se lo envia a detalle con el nombre miProducto
      miColor: colorNombres, //y los nombres de colores
    });
  },

  //:::::VER VISTA DE CREAR PRODUCTOS:::::
  crearProductosVista: function (req, res, next) {
    const productosjs = JSON.parse(fs.readFileSync(productsPath, "utf-8")); //productos a js
    const colors = JSON.parse(fs.readFileSync(colorsPath, "utf-8")); //colores a js
    const modelsjs = JSON.parse(fs.readFileSync(modelsPath, "utf-8")); //colores a js

    res.render("products/crearprod", { colors, modelsjs }); //envia los colores y modelos a la vista de crear productos
  },

  //:::::LOGICA PARA CREAR PRODUCTOS NUEVOS:::::
  crearProductosjson: function (req, res) {
    const productosjs = JSON.parse(fs.readFileSync(productsPath, "utf-8")); //productos a js
    //console.log(req.body); //verifica que se envian los datos del formulario

    const nuevoProducto = {
      id: uudi(), // genera un id unico
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      modeloId: parseInt(req.body.modeloId), // convierte el id del modelo a entero
      precio: parseFloat(req.body.precio),
      colorIds: req.body.color ? req.body.color.map((c) => parseInt(c)) : [0], // verifica si hay color elegido, sino asigna el primer color
      tamano: req.body.tamano,
      stock: parseInt(req.body.stock),
      imagen:
        req.files && req.files.length > 0
          ? req.files.map((f) => f.filename)
          : ["lamperror.png"], // verifica si hay archivo, si no, asigna una imagen por defecto
      destacado: req.body.destacado === "SI", // verifica si el producto es destacado
    };

    //console.log(nuevoProducto); //verifica que se crea el nuevo producto
    productosjs.push(nuevoProducto); // agrega el nuevo producto al array de productos
    const productosJson = JSON.stringify(productosjs, null, 2); // convierte el array de productos a json
    fs.writeFileSync(productsPath, productosJson, "utf-8"); // escribe el archivo de productos
    res.redirect("/products/productos"); // redirige a la lista de productos
  },

  //:::::VER VISTA DE EDITAR PRODUCTOS:::::
  editarProductosVista: function (req, res, next) {
    const productosjs = JSON.parse(fs.readFileSync(productsPath, "utf-8")); //productos a js
    const colors = JSON.parse(fs.readFileSync(colorsPath, "utf-8")); //colores a js
    const modelsjs = JSON.parse(fs.readFileSync(modelsPath, "utf-8")); //colores a js

    const idProducto = req.params.id; // <-- el id que viene desde la URL
    const productoEncontrado = productosjs.find((p) => p.id == idProducto); // busca por id

    if (!productoEncontrado) {
      //si no lo encuentra
      return res.render("products/editarprod", {
        miProducto: productoEncontrado,
      }); //de momento funciona. Corregir despues
    }

    res.render("products/editarprod", {
      miProducto: productoEncontrado, //si lo encuentra se lo envia a editar con el nombre miProducto
      colors, //colores
      modelsjs,
    });
  },

  //:::::LOGICA PARA EDITAR PRODUCTOS:::::
  editarProductosjson: function (req, res) {
    const productosjs = JSON.parse(fs.readFileSync(productsPath, "utf-8")); //productos a js
    productosjs.forEach((produtemp) => {
      if (produtemp.id == req.params.id) {
        //console.log(`Se actualizo el producto con id ${req.params.id} y es el ${produ.nombre}`);
        produtemp.nombre = req.body.nombre;
        produtemp.descripcion = req.body.descripcion;
        produtemp.modeloId = parseInt(req.body.modeloId);
        produtemp.precio = parseInt(req.body.precio); // de momento lo dejo en entero
        // Manejo de colores
        let coloresSeleccionados = req.body.colorIds;

        if (!coloresSeleccionados) {
          coloresSeleccionados = [0]; // se asigna el color por defecto si no se selecciona ninguno
        } else if (!Array.isArray(coloresSeleccionados)) {
          //si eligio solo un color se debe convertir a array
          coloresSeleccionados = [coloresSeleccionados];
        }
        // Convertir todos los ids a enteros
        produtemp.colorIds = coloresSeleccionados.map((c) => parseInt(c));

        produtemp.tamano = req.body.tamano;
        produtemp.stock = parseInt(req.body.stock);
        if (req.files && req.files.length > 0) {
          //si se subieron nuevas imagenes
          produtemp.imagen = req.files.map((file) => file.filename); // reemplaza las img existentes con las nuevas
        } //si no se subieron nuevas imagenes, mantiene las existentes
        produtemp.destacado = req.body.destacado === "SI";
      }
    });

    const productosJson = JSON.stringify(productosjs, null, 2); // convierte el array de productos a json
    fs.writeFileSync(productsPath, productosJson, "utf-8"); // escribe el archivo de productos
    res.redirect(`/products/detalle/${req.params.id}`); // redirige a la lista de productos
    //console.log(req.body); //verifica que se envian los datos del formulario
    //console.log("Se actualizo el producto: ", req.params.id); //verifica que se envian los datos del formulario
  },

  //:::::LOGICA PARA ELIMINAR PRODUCTOS:::::
  eliminarProductos: function (req, res) {
    const productosjs = JSON.parse(fs.readFileSync(productsPath, "utf-8")); //productos a js
    const productosFiltrados = productosjs.filter(
      (product) => product.id != req.params.id
    ); // filtra los productos que no son el que se quiere eliminar
    //recordar que anteriormente se uso una comparacion simple (!=)
    const productosJson = JSON.stringify(productosFiltrados, null, 2); // convierte el array de productos a json
    fs.writeFileSync(productsPath, productosJson, "utf-8"); // escribe el archivo de productos
    res.redirect("/products/productos"); // redirige a la lista de productos
    //console.log("Se elimino el producto: ", req.params.id); //verifica que se envian los datos del formulario
  },

  //:::::VER VISTA DE EDITAR PROPIEDADES DE PRODUCTOS:::::
  editarPropiedadesVista: function (req, res, next) {
    const productosjs = JSON.parse(fs.readFileSync(productsPath, "utf-8")); //productos a js
    const colors = JSON.parse(fs.readFileSync(colorsPath, "utf-8")); //colores a js
    const modelsjs = JSON.parse(fs.readFileSync(modelsPath, "utf-8")); //colores a js

    res.render("products/editarPropiedad", {
      miColor: colors, //colores
      miModelo: modelsjs, //modelos
    });
  },

  //:::::LOGICA PARA EDITAR PROPIEDADES DE PRODUCTOS:::::
  editarPropiedadesjson: function (req, res) {
    const productosjs = JSON.parse(fs.readFileSync(productsPath, "utf-8")); //productos a js
    const colors = JSON.parse(fs.readFileSync(colorsPath, "utf-8")); //colores a js
    const modelsjs = JSON.parse(fs.readFileSync(modelsPath, "utf-8")); //modelos a js

    //AGREGAR MODELO
    if (req.body.nombreModelo && req.body.nombreModelo.trim() !== "") {
      // si se envio un nuevo modelo y no esta vacio
      const nuevoModelo = {
        id: uudi(), // genera un id unico
        nombre: req.body.nombreModelo,
      };

      modelsjs.push(nuevoModelo); // agrega el nuevo modelo al array de modelos
      const modelsJson = JSON.stringify(modelsjs, null, 2); // convierte el array de modelos a json
      fs.writeFileSync(modelsPath, modelsJson, "utf-8"); // escribe el archivo de modelos
    }

    //AGREGAR COLOR
    if (req.body.nombreColor && req.body.nombreColor.trim() !== "") {
      // si se envio un nuevo color y no esta vacio
      const nuevoColor = {
        id: uudi(), // genera un id unico
        nombre: req.body.nombreColor,
      };

      colors.push(nuevoColor); // agrega el nuevo color al array de colores
      const colorJson = JSON.stringify(colors, null, 2); // convierte el array de colores a json
      fs.writeFileSync(colorsPath, colorJson, "utf-8"); // escribe el archivo de colores
    }

    //ELIMINAR MODELO
    if (req.body.modeloIds) {
      let modeloSeleccionados = req.body.modeloIds;

      if (!Array.isArray(modeloSeleccionados)) {
        modeloSeleccionados = [modeloSeleccionados];
      }

      modeloSeleccionados = modeloSeleccionados.map((c) => parseInt(c));

      // Recorrer todos los productos y reemplazar los modelos eliminados con 0 (solo se puede elegir un modelo)
      productosjs.forEach((producto) => {
        if (modeloSeleccionados.includes(producto.modeloId)) {
          producto.modeloId = 0;
        }
      });

      // Guardar los productos actualizados
      fs.writeFileSync(
        productsPath,
        JSON.stringify(productosjs, null, 2),
        "utf-8"
      );

      const modelosFiltrados = modelsjs.filter(
        (modelo) => !modeloSeleccionados.includes(modelo.id)
      );
      fs.writeFileSync(
        modelsPath,
        JSON.stringify(modelosFiltrados, null, 2),
        "utf-8"
      );
    }

    // ELIMINAR COLOR
    if (req.body.colorIds) {
      let coloresSeleccionados = req.body.colorIds;

      if (!Array.isArray(coloresSeleccionados)) {
        coloresSeleccionados = [coloresSeleccionados]; // convertir a array si solo selecciono uno
      }

      coloresSeleccionados = coloresSeleccionados.map((c) => parseInt(c)); // convertir a enteros

      // Recorrer todos los productos y limpiar los colores eliminados
      productosjs.forEach((producto) => {
        producto.colorIds = producto.colorIds.filter(
          (id) => !coloresSeleccionados.includes(id) // quitar los eliminados
        );

        // Si queda vacio, asignar id 0 (ninguno)
        if (producto.colorIds.length === 0) {
          producto.colorIds = [0];
        }
      });

      // Guardar los productos actualizados
      fs.writeFileSync(
        productsPath,
        JSON.stringify(productosjs, null, 2),
        "utf-8"
      );

      // Filtrar los colores eliminados del archivo de colores
      const coloresFiltrados = colors.filter(
        (color) => !coloresSeleccionados.includes(color.id)
      );
      fs.writeFileSync(
        colorsPath,
        JSON.stringify(coloresFiltrados, null, 2),
        "utf-8"
      );
    }

    //console.log(req.body);

    res.redirect("/products/productos"); // redirige a la lista de productos
  },
};

module.exports = productsController;
