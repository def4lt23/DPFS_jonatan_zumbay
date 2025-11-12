const db = require("../database/models/index.js");

const indexController = {
  home: function (req, res, next) {
    res.render("index", { title: "Express" });
  }

  //colocar la coma arriba si agrego otro metodo aqui

};


module.exports = indexController;
