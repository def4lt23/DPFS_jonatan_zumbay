var express = require('express');
const productsController = require('../controllers/productsController');
var router = express.Router();

/* GET productos page. */
router.get('/productos', productsController.productos);

// :id significa que es un parámetro dinámico en la URL
router.get('/detalle/:id', productsController.enviarProducto);

module.exports = router;
