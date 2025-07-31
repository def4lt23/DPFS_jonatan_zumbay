var express = require('express');
const productsController = require('../controllers/productsController');
var router = express.Router();

/* GET productos page. */
router.get('/productos', productsController.productos);

module.exports = router;
