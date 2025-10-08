var express = require('express');
const admin = require('../middlewares/admin'); // Importar middleware admin para proteger rutas de administracion
const productsController = require('../controllers/productsController');
const {upload} = require('../middlewares/multer'); // Importar multer para manejar archivos , se colocaron llaves porque son dos uploads
var router = express.Router();

/* GET VER PRODUCTOS */
router.get('/productos', productsController.productos);

// GET VER UN PRODUCTO:id parametro dinamico en la URL
router.get('/detalle/:id', productsController.enviarProductos);

/* GET CREAR PRODUCTOS NUEVOS */
router.get('/crearprod', admin, productsController.crearProductosVista);
router.post('/crearprod', admin, upload.array('imagen', 5), productsController.crearProductosBD); //enviar informacion del formulario

/*GET EDITAR UN PRODUCTO NUEVO*/
router.get('/editarprod/:id', admin, productsController.editarProductosVista);
router.put('/editarprod/:id', admin, upload.array('imagen', 5), productsController.editarProductosBD); //recibe la informacion del formulario

/*GET ELIMINAR UN PRODUCTO*/
router.delete('/eliminarprod/:id', admin, productsController.eliminarProductosBD); //recibe la informacion del formulario

/* GET EDITAR PROPIEDADES DE PRODUCTOS */
router.get('/editarPropiedad', admin, productsController.editarPropiedadesVista);
router.post('/editarPropiedad', admin, productsController.editarPropiedadesBD); //recibe la informacion del formulario
module.exports = router;
