const fs = require('fs') //file system
const path = require('path') // manejar las rutas

const productsPath = path.join(__dirname, '../data/products.json'); // ruta al archivo de productos
const colorsPath = path.join(__dirname, '../data/colors.json'); // ruta al archivo de colores
const modelsPath = path.join(__dirname, '../data/models.json'); // ruta a los modelos

const productsController = {
  productos: function (req, res, next) {
    const productosjs = JSON.parse(fs.readFileSync(productsPath, 'utf-8')) // leer el archivo y convertirlo a un objeto js

    res.render("products/productos", {productosjs});
  },

  // NUEVO METODO para manejar el envio de un producto especifico
  //PRIMERO VA EL NOMBRE DEL MÉTODO
  enviarProductos: function (req, res, next) {
    const productosjs = JSON.parse(fs.readFileSync(productsPath, 'utf-8')); //productos a js
    const colors = JSON.parse(fs.readFileSync(colorsPath, 'utf-8')); //colores a js
    
    const idProducto = req.params.id; // <-- el id que viene desde la URL
    const productoEncontrado = productosjs.find(p => p.id == idProducto); // busca por id

    if (!productoEncontrado) { //si no lo encuentra
      res.render("products/detalle", {miProducto: productoEncontrado}); //corregir despues, porque si elimino esto da error en colorid abajo
    }

      // Mapear los colorIds del producto a los nombres de colores
      const colorNombres = productoEncontrado.colorIds.map(id => {
      const color = colors.find(c => c.id === id);
      return color ? color.nombre : 'Color desconocido';
    });

    res.render("products/detalle", { 
      miProducto: productoEncontrado,  //si lo encuentra se lo envia a detalle con el nombre miProducto
      miColor: colorNombres //y los nombres de colores
    });
  },

  crearProductosVista: function (req, res, next) {
    const productosjs = JSON.parse(fs.readFileSync(productsPath, 'utf-8')); //productos a js
    const colors = JSON.parse(fs.readFileSync(colorsPath, 'utf-8')); //colores a js
    const modelsjs = JSON.parse(fs.readFileSync(modelsPath, 'utf-8')); //colores a js

    res.render("products/crearprod", {colors, modelsjs}); //envia los colores y modelos a la vista de crear productos
  },

  crearProductosjson: function (req, res) {
    const productosjs = JSON.parse(fs.readFileSync(productsPath, 'utf-8')); //productos a js
    //console.log(req.body); //verifica que se envian los datos del formulario

    const nuevoProducto = {
      id: productosjs.length + 1, //asigna un id al nuevo producto
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      modeloId: parseInt(req.body.modeloId), // convierte el id del modelo a entero
      precio: parseFloat(req.body.precio),
      colorIds: req.body.color.map(c => parseInt(c)), // convierte los ids de colores a enteros
      tamano: req.body.tamano,
      stock: parseInt(req.body.stock),
      imagen: ['lamperror.png'], // verifica si hay archivo, si no, asigna una imagen por defecto
      destacado: req.body.destacado === 'SI' // verifica si el producto es destacado
    };

    //console.log(nuevoProducto); //verifica que se crea el nuevo producto
    productosjs.push(nuevoProducto); // agrega el nuevo producto al array de productos
    const productosJson = JSON.stringify(productosjs, null, 2); // convierte el array de productos a json
    fs.writeFileSync(productsPath, productosJson, 'utf-8'); // escribe el archivo de productos
    res.redirect('/products/productos'); // redirige a la lista de productos

  },

  editarProductos: function (req, res, next) {
    const productosjs = JSON.parse(fs.readFileSync(productsPath, 'utf-8')); //productos a js
    const colors = JSON.parse(fs.readFileSync(colorsPath, 'utf-8')); //colores a js
    const modelsjs = JSON.parse(fs.readFileSync(modelsPath, 'utf-8')); //colores a js

    const idProducto = req.params.id; // <-- el id que viene desde la URL
    const productoEncontrado = productosjs.find(p => p.id == idProducto); // busca por id

    if (!productoEncontrado) { //si no lo encuentra
      return res.status(404).send("Producto no encontrado");
    }

    res.render("products/editarprod", { 
      miProducto: productoEncontrado,  //si lo encuentra se lo envia a editar con el nombre miProducto
      colors, //colores
      modelsjs
    });
  }

};


module.exports = productsController;
