var express = require('express');
const {carrito, quienessomos, registro} = require('../controllers/usersController');
var router = express.Router();

/* GET carrito page. */
router.get('/carrito', carrito);

/* GET quienessomos page. */
router.get('/quienessomos', quienessomos);

/* GET registro page. */
router.get('/registro', registro);

module.exports = router;
