var express = require('express');
const productsController = require('../controllers/productsController');
const {upload} = require('../middlewares/multer'); // Importar multer para manejar archivos , se colocaron llaves porque son dos uploads
var router = express.Router();

/* GET VER PRODUCTOS */
router.get('/productos', productsController.productos);

// GET VER UN PRODUCTO:id parametro dinamico en la URL
router.get('/detalle/:id', productsController.enviarProductos);

/* GET CREAR PRODUCTOS NUEVOS */
router.get('/crearprod', productsController.crearProductosVista);
router.post('/crearprod', upload.array('imagen', 5), productsController.crearProductosjson); //enviar informacion del formulario

/*GET EDITAR UN PRODUCTO NUEVO*/
router.get('/editarprod/:id', productsController.editarProductosVista);
router.put('/editarprod/:id', upload.array('imagen', 5), productsController.editarProductosjson); //recibe la informacion del formulario

/*GET ELIMINAR UN PRODUCTO*/
router.delete('/eliminarprod/:id', productsController.eliminarProductos); //recibe la informacion del formulario

/* GET EDITAR PROPIEDADES DE PRODUCTOS */
router.get('/editarPropiedad', productsController.editarPropiedadesVista);
router.post('/editarPropiedad', productsController.editarPropiedadesjson); //recibe la informacion del formulario
module.exports = router;
