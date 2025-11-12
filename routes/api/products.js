let express = require('express');
const {allProducts, productDetail} = require('../../controllers/api/productsController');
let router = express.Router();

//obtener todos los productos
router.get('/', allProducts);

//Producto por pk
router.get('/:id', productDetail);

module.exports = router;
