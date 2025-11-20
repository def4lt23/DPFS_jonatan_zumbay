// routes/cart.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Agregar producto al carrito
router.post('/add/:productId', cartController.addProduct);

// Ver carrito completo
router.get('/carrito', cartController.getCart);

// Obtener cantidad de productos en el carrito (para navbar)
router.get('/count', cartController.getCartCount);

//vaciar carrito
router.delete("/clear", cartController.clearCart);

//eliminar un producto
router.delete('/remove/:itemId', cartController.removeItem);


module.exports = router;
