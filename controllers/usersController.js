const userController = {
    carrito: function(req, res, next) {
  res.render('users/carrito.ejs', { title: 'Carrito' });
},

    quienessomos: function(req, res, next) {
  res.render('users/quienessomos.ejs', { title: 'QuienesSomos' });
},

    registro: function(req, res, next) {
  res.render('users/registro.ejs', { title: 'Registro' });
}


}

module.exports = userController;