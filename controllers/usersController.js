const userController = {
  carrito: function (req, res, next) {
    res.render("users/carrito.ejs", { title: "Carrito" });
  },

  quienessomos: function (req, res, next) {
    res.render("users/quienessomos.ejs", { title: "QuienesSomos" });
  },

  registro: function (req, res, next) {
    res.render("users/registro.ejs", { title: "Registro" });
  },

  procesarLogin: function (req, res, next) {
    console.log(req.body);
    res.render("index.ejs", { title: "LUZIFY" });
  },

  procesarRegistro: function (req, res, next) {
    console.log(req.body);
    console.log(req.file); // Información del archivo subido
    res.render("index.ejs", { title: "LUZIFY" });
  },
};

module.exports = userController;
