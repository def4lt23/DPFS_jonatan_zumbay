var express = require('express');
const logged = require('../middlewares/logged');
const guestOnly = require('../middlewares/guestOnly');
const {uploadUser} = require('../middlewares/multer'); // Importar multer para manejar archivos, va con llaves porque son dos uploads
const {carrito, quienessomos, registro, procesarLogin, procesarRegistro, vistaPerfil, editarUsuarioVista, editarUsuariojson, 
    cerrarsesion, eliminarUsuarioVista, eliminarUsuariojson} 
= require('../controllers/usersController');
var router = express.Router();

/* GET carrito page. */
router.get('/carrito', carrito);

/* GET quienessomos page. */
router.get('/quienessomos', quienessomos);

/* CARGAR VISTA DE INICIAR SESION O REGISTRO */
router.get('/registro',guestOnly, registro); /* Vista */
router.post('/login',guestOnly, procesarLogin) /* Logica */
router.post('/registro',guestOnly, uploadUser.single('imagen'), procesarRegistro) /* Logica */

/*Vista de perfil de usuario*/ 
router.get('/perfil', logged, vistaPerfil) /* Vista del perfil de usuario */

/*RUTA PARA EDITAR USUARIO*/
router.get('/editarusuario/:id', logged, editarUsuarioVista); /* Vista para editar usuario */
router.put('/editarusuario/:id', logged, uploadUser.single('imagen'), editarUsuariojson); /* Logica para editar usuario */

/*CERRAR SESION*/ 
router.get('/logout', logged, cerrarsesion); /* Logica para cerrar sesion */

/*ELIMINAR USUARIO*/
router.get('/eliminarUsuario', logged, eliminarUsuarioVista); /* Vista para eliminar usuario */
router.delete('/eliminarUsuario/:id', logged, eliminarUsuariojson); /* Logica para eliminar usuario */

module.exports = router;
