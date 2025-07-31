const productsController = {
  productos: function (req, res, next) {
    res.render("products/productos", { title: "Productos" });
  }

  //si quiero agregar coloco una coma y abajo el siguiente metodo.


};


module.exports = productsController;
