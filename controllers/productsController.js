const fs = require('fs') //file system
const path = require('path') // manejar las rutas

const productsPath = path.join(__dirname, '../data/products.json'); // ruta al archivo de productos

const productsController = {
  productos: function (req, res, next) {
    const productosjs = JSON.parse(fs.readFileSync(productsPath, 'utf-8')) // leer el archivo y convertirlo a un objeto js

    res.render("products/productos", {productosjs});
  }

  //si quiero agregar coloco una coma y abajo el siguiente metodo.


};


module.exports = productsController;
