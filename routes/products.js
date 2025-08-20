var express = require('express');
const productsController = require('../controllers/productsController');
var router = express.Router();

/* GET VER PRODUCTOS */
router.get('/productos', productsController.productos);

// GET VER UN PRODUCTO:id parametro dinamico en la URL
router.get('/detalle/:id', productsController.enviarProductos);

/* GET CREAR PRODUCTOS NUEVOS */
router.get('/crearprod', productsController.crearProductosVista); //cargar formulario

router.post('/crearprod', productsController.crearProductosjson); //enviar informacion del formulario

/*GET EDITAR UN PRODUCTO NUEVO*/
router.get('/editarprod/:id', productsController.editarProductos);

module.exports = router;
