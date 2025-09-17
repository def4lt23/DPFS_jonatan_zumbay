============================================================================================
>>>**SPRINT 1**
**GRUPO 6 - ZUMBAY JONATAN**
* SE CREO EL PROYECTO Y ALOJADO EN GITHUB: https://github.com/def4lt23/DPFS_jonatan_zumbay.git
* SE CREO UNA PIZARRA EL TRELLO PARA ORGANIZACION: https://trello.com/b/xjRbIhYZ/team-luzify
* SE CREARON LOS WIREFRAMES PARA LAS VISTAS DE LA PAGINA (TANTO EN MODO ESCRITORIO COMO EN TELEFONOS MOVILES)
* SE CREO UN ARCHIVO ReporteActividades.txt PARA DESCRIBIR EL TRABAJO
* SE CREO LOS ARCHIVOS README.md y CONDICIONES.md CON LA PRESENTACION Y ASPECTOS DE LA PAGINA

**DEVOLUCION**
Excelente implementacion del primer sprint, destaco la organizacion, comentarios y condiciones para la implementacion de cada vista, vamos por el segundo!

============================================================================================
>>>**SPRINT 2**
* SE CREO LOS ARCHIVOS HTML DE LAS VISTAS
* SE CREO LOS ARCHIVOS CSS DE LAS VISTAS
* SE CREARON Y MODIFICARON IMAGENES COMO RECURSOS PARA LA PAGINA
* SE MODIFICO DETALLES DE ASPECTOS VISUALES DE LA PAGINA EN EL ARCHIVO README.md
* SE CREO ARCHIVO retro.md CON RETROSPECTIVAS

* ACLARACION: COMO HICE LOS FORMULARIOS DE LOGIN Y REGISTRARSE EN LA MISMA VISTA AGREGUE UNA NUEVA VISTA LLAMADA quienessomos.html DONDE SE MUESTRA UN POCO UNA PRESENTACION Y UBICACION DE LA EMPRESA. ADEMAS, USE MUY POCO JS SOLO PARA ALGUNAS FUNCIONALIDADES, EN FUTURAS ENTREGAS ESPERO ADAPTAR MEJOR ESTOS SCRIPTS EN UN ARCHIVO .JS

**DEVOLUCION**
Holaa como estas Jonatan, hace un momento vi tu proyecto, va excelente todo documentado el progreso, las vistas están perfectas, me encantó la ui de la pagina, vi que pesa mucho el repositorio, te recomiendo que comprimas las imagenes, te paso ésta pagina que me funcionó  https://www.iloveimg.com/es/comprimir-imagen. SPRINT 2 OK.

============================================================================================
>>>**SPRINT 3**
* SE MODIFICARON LAS IMAGENES CON EL SITIO WEB RECOMENDADO, LA CARPETA PASO DE PESAR 132MB A 33MB, BAJANDO UN 75% DE SU TAMAÑO INICIAL.
* SE INSTALO EXPRESS DENTRO DE LA CARPETA DEL PROYECTO, RENOMBRANDO LOS HTML A EJS.
* SE INSTALO NODEMON PARA FACILITAR LOS CAMBIOS CON EL SERVIDOR.
* EDITARON LOS ARCHIVOS APP.JS Y LOS DE LA CARPETA ROUTES PARA PODER REDIRECCIONAR LAS VISTAS.
* SE CREARON LOS ARCHIVOS DE LA CARPETA CONTROLLERS, DE AHI SE MOVIERON LAS FUNCIONES DE LOS ARCHIVOS JS DE ROUTES.
* SE CREO EL ARCHIVO .GITIGNORE PARA NO SUBIR TODO LO DE LA CARPETA NODE_MODULES.
* SE CREO LA CARPETA PARTIALS CON LOS ARCHIVOS CORRESPONDIENTES PARA MOSTRAR LAS VISTAS DE FORMA DINAMICA.
* EDITADOS LOS ARCHIVOS EJS PARA LLAMAR LAS VISTAS DE LA CARPETA PARTIALS.

**DEVOLUCION**
Excelente trabajo! Se implemento el sprint 3 con express y ejs 100% funcional, vamos por el CRUD en el sprint 4, saludos!

============================================================================================
>>>**SPRINT 4**
* SE CREO LA CARPETA data CON LOS ARCHIVOS JSON QUE SE MANEJARAN: products y user (PARA ALMACENAR INFO). colors y models (PARA ALMACENAR ATRIBUTOS)
* SE CREO LA VISTA detalle.ejs DONDE SE VE DE FORMA DINAMICA LAS PROPIEDADES DE LOS PRODUCTOS, ADEMAS SE MODIFICO LA RUTA CORRESPONDIENTE.
* SE EDITO EL ARCHIVO productsController.js PARA LEER EL JSON DE PRODUCTOS.
* SE EDITO LA VISTA productos.ejs Y AHORA SE MANEJAN DE FORMA DINAMICA LOS PRODUCTOS SEGUN EL ARCHIVO JS DE DATA.
* SE CREO LA VISTA crearprod.ejs DONDE SE AGREGARAN LOS PRODUCTOS NUEVOS, ADEMAS SE MODIFICO productsController.js Y LA RUTA CORRESPONDIENTE PARA LEER LAS OPCIONES DE FORMA DINAMICA.
* SE MODIFICO ARCHIVO detalle.ejs PARA MOSTRAR UN MENSAJE DE PRODUCTO NO ENCONTRADO EN CASO QUE NO COINCIDA EL ID CON EL DE ALGUN PRODUCTO.
* SE CREO LA VISTA editarprod.ejs DONDE MUESTRA TODAS LAS PROPIEDADES DEL PRODUCTO Y DEJA CAMBIAR ALGUNA DE ELLAS.
* SE MODIFICO ARCHIVO detalle.ejs PARA PODER EDITAR O ELIMINAR LOS PRODUCTOS DEL EL ARCHIVO products.json DE LA CARPETA DATA.
* SE INSTALO MULTER PARA PODER TRABAJAR CON IMAGENES, AHORA SE PUEDE CREAR Y EDITAR LOS PRODUCTOS CON IMAGENES.
* SE MODIFICO ARCHIVOS CSS PARA ADAPTAR MEJOR LOS BOTONES DE LAS VISTAS Y EL USO DE RESPONSIVE.
||| EN RESUMEN |||
    a- Se pueden leer, crear, editar y eliminar productos. Todo de forma dinamica relacionado con el archivo json de data.
    b- Se tuvo en cuenta los controles de creacion y edicion (de que sean requeridos los campos y de controlar si se manda vacio alguna opocion para setear algunas por defecto y que no quede vacia alguna propiedad).
    c- Si se lee un id incorrecto se mostrara un mensaje de error.
    d- Se pueden trabajar con imagenes gracias a MULTER.
    e- Se dejo una carpeta "test_images" para que se pueda probar la subida de imagenes (ya fueron previamente comprimidas).
    NOTA: Soy conciente que la forma de crear los id de los productos nuevos es muy facil de romper y provocar errores, mas adelante se implementara un metodo mas seguro de hacerlo. Para hacer pruebas el metodo actual funciona.

**DEVOLUCION**
Excelente avance del proyecto, en el metodo de enviarProductos vi que tenes un condicional que hace render, en ese caso tendras que hacer un return asino te tire el error de doble respuesta. Lo probé agregando el return y dej de aparecer el error. El crud funciona perfecto, sin detalles para agregar, vamos por el siguiente sprint! Saludos

============================================================================================
>>>**SPRINT 5**
**VISTAS**
* SE AGREGARON LAS VISTAS DEP PERFIL, EDITAR USUARIO Y ELIMINAR USUARIO. TAMBIEN SE MODIFICO LA DE REGISTRO CON FORM PARA QUE ENVIE INFORMACION.
* SE EDITARON LOS ARCHIVOS EN ROUTES Y CONTROLLERS PARA QUE MANEJEN LAS FUNCIONES DE LOS USUARIOS (ALTA, BAJA Y MODIFICACION).
**INSTALACION**
* SE INSTALO SESION, COOKIE-PARSER, BCRYPTSJS Y UUID PARA EL MANEJO DE USUARIOS. SE TUVO EN CUENTA EL ORDEN EN EL ARCHIVO APP.JS PARA EVITAR ERRORES.
**MIDDLEWARES**
* SE CREARON USERLOGGED, LOGGED, GUESTONLY Y ADMIN. TODOS CON EL FIN DE MANEJAR USUARIOS, DE ESA FORMA IMPEDIR QUE SE ACCEDAN A ENLACES QUE NO TIENEN PERMITIDOS.
* SE EDITO EL ARCHIVO MULTER.JS PARA MANEJAR IMAGENES DE LOS USUARIOS.
**CORRECCIONES**
* SE AGREGO LA SECCION DE EDITAR PROPIEDADES (SOLO ADMIN) PARA EDITAR MODELOS Y COLORES DE LAS LAMPARAS.
* SE AGREGO EL NOMBRE DE USUARIO Y CERRAR SESION EN EL MENU HAMBURGUESA PARA PANTALLAS PEQUEÑAS.
||| EN RESUMEN |||
    a- Se puede hacer alta, baja y modificacion de usuarios. Teniendo en cuenta los campos requeridos y controlando para no repetir. Para los administradores se les agrega la opcion de volver administrador a otro usuario.
    b- Con los nuevos middlewares se puede evitar que se accedan a ciertas secciones de la pagina para evitar errores, sumando tambien para saber si un usuario es admin o esta logueado para mostrar mas o menos informacion.
    c- Las id son creadas de otra manera mas robusta y segura para evitar errores con uuid.

**DEVOLUCION**