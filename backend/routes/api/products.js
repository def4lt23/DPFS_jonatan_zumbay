let express = require('express');
const {allProducts, productDetail, modelsAndColors, addColor, addModel, lastProduct} = require('../../controllers/api/productsController');
let router = express.Router();

//obtener todos los productos
router.get('/', allProducts);

//obtener los modelos y los colores de un producto
router.get('/utils', modelsAndColors);

//agregar un nuevo color a un producto
router.post('/add-color', addColor);

//agregar un nuevo modelo a un producto
router.post('/add-model', addModel);

// obtener ultimo usuario
router.get('/last', lastProduct);

//Producto por pk
router.get('/:id', productDetail);




module.exports = router;
