var express = require('express');
const {uploadUser} = require('../middlewares/multer'); // Importar multer para manejar archivos, va con llaves porque son dos uploads
const {carrito, quienessomos, registro, procesarLogin, procesarRegistro} = require('../controllers/usersController');
var router = express.Router();

/* GET carrito page. */
router.get('/carrito', carrito);

/* GET quienessomos page. */
router.get('/quienessomos', quienessomos);

/* CARGAR VISTA DE INICIAR SESION O REGISTRO */
router.get('/registro', registro); /* Vista */
router.post('/login', procesarLogin) /* Logica */
router.post('/registro', uploadUser.single('imagen'), procesarRegistro) /* Logica */

module.exports = router;
