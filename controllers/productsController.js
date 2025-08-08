const fs = require('fs') //file system
const path = require('path') // manejar las rutas

const productsPath = path.join(__dirname, '../data/products.json'); // ruta al archivo de productos
const colorsPath = path.join(__dirname, '../data/colors.json'); // ruta al archivo de colores

const productsController = {
  productos: function (req, res, next) {
    const productosjs = JSON.parse(fs.readFileSync(productsPath, 'utf-8')) // leer el archivo y convertirlo a un objeto js

    res.render("products/productos", {productosjs});
  },

  // NUEVO MÉTODO para manejar el envío de un producto específico
  //PRIMERO VA EL NOMBRE DEL MÉTODO
  enviarProducto: function (req, res, next) {
    const productosjs = JSON.parse(fs.readFileSync(productsPath, 'utf-8')); //productos a js
    const colors = JSON.parse(fs.readFileSync(colorsPath, 'utf-8')); //colores a js
    
    const idProducto = req.params.id; // <-- el id que viene desde la URL
    const productoEncontrado = productosjs.find(p => p.id == idProducto); // busca por id

    if (!productoEncontrado) { //si no lo encuentra
      return res.status(404).send("Producto no encontrado");
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

};


module.exports = productsController;
