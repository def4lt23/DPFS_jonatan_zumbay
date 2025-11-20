const db = require("../database/models/index.js");
const { Op } = require("sequelize"); // si necesitas operadores

const { Cart, CartItem, Product, ProdImage } = db;

module.exports = {

  // Agregar producto al carrito
addProduct: async (req, res) => {
  try {

        // <-- AGREGAR ESTO
    if (!req.session || !req.session.usuarioLogueado) {
      return res.status(401).json({ success: false, message: "Debes iniciar sesión para agregar productos" });
    }
    // <-- HASTA AQUÍ

    const userId = req.session.usuarioLogueado.id;
    const productId = req.params.productId;

    // Buscar el producto para validar stock
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ success: false, message: "Producto no encontrado" });
    }
    if (product.stock < 1) {
      return res.status(400).json({ success: false, message: "No hay stock disponible" });
    }

    // Buscar carrito activo o crear uno
    let cart = await Cart.findOne({ where: { userId, active: true } });

    if (!cart) {
      cart = await Cart.create({ userId, active: true });
    }

    // Buscar si el producto ya está en el carrito
    let cartItem = await CartItem.findOne({ where: { cartId: cart.id, productId } });

    if (cartItem) {
      if (cartItem.quantity + 1 > product.stock) {
        return res.status(400).json({ success: false, message: "Supera el stock disponible" });
      }
      cartItem.quantity += 1;
      await cartItem.save();
    } else {
      cartItem = await CartItem.create({ cartId: cart.id, productId, quantity: 1 });
    }

    res.json({ success: true, message: "Producto agregado al carrito" });

  } catch (error) {
    console.error("Error en addProduct:", error);
    res.status(500).json({ success: false, message: "Error agregando producto" });
  }
},


getCart: async (req, res) => {
  try {
    let cart = { items: [] }; // valor por defecto

    if (req.session.usuarioLogueado?.id) {
      const userId = req.session.usuarioLogueado.id;

      const foundCart = await Cart.findOne({
        where: { userId, active: true },
        include: {
          model: CartItem,
          as: 'items',
          include: [
            {
              model: Product,
              as: 'product',
              include: [{ model: ProdImage, as: 'images', limit: 1 }]
            }
          ]
        }
      });

      if (foundCart) cart = foundCart;
    }
    res.render('users/carrito', { cart });

  } catch (error) {
    console.error(error);
    res.status(500).send("Error cargando carrito");
  }
},



  // Contador de productos en navbar
getCartCount: async (req, res) => {
  try {

    if (!req.session || !req.session.usuarioLogueado) {
      return res.json({ count: 0 });
    }

    const userId = req.session.usuarioLogueado.id;

    const cart = await Cart.findOne({
      where: { userId, active: true },
      include: 'items'
    });

    let count = 0;
    if (cart && cart.items) {
      count = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    res.json({ count });

  } catch (error) {
    console.error("Error en getCartCount:", error);
    res.json({ count: 0 });
  }
}, 

clearCart: async (req, res) => {
  try {
    if (!req.session.usuarioLogueado) {
      return res.status(401).json({ success: false, message: "Debes iniciar sesión" });
    }

    const userId = req.session.usuarioLogueado.id;

    const cart = await Cart.findOne({
      where: { userId, active: true },
      include: 'items'
    });

    if (!cart) {
      return res.json({ success: true, message: "Carrito ya estaba vacío" });
    }

    // Borrar todos los CartItem
    await CartItem.destroy({ where: { cartId: cart.id } });

    return res.json({ success: true, message: "Carrito vaciado" });

  } catch (error) {
    console.error("Error al vaciar carrito:", error);
    res.status(500).json({ success: false, message: "Error al vaciar carrito" });
  }
},

// vaciar carrito
removeItem: async (req, res) => {
  try {
    if (!req.session.usuarioLogueado) {
      return res.status(401).json({ success: false, message: "Debes iniciar sesión" });
    }

    const userId = req.session.usuarioLogueado.id;
    const cartItemId = req.params.itemId;

    // Buscar el carrito del usuario
    const cart = await Cart.findOne({
      where: { userId, active: true }
    });

    if (!cart) {
      return res.status(404).json({ success: false, message: "Carrito no encontrado" });
    }

    // Verificar que el item pertenece al carrito del usuario
    const item = await CartItem.findOne({
      where: { id: cartItemId, cartId: cart.id }
    });

    if (!item) {
      return res.status(404).json({ success: false, message: "Producto no encontrado en el carrito" });
    }

    await item.destroy();

    return res.json({ success: true, message: "Producto eliminado del carrito" });

  } catch (error) {
    console.error("Error en removeItem:", error);
    res.status(500).json({ success: false, message: "Error eliminando item" });
  }
},




};
