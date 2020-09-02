const express = require('express');
const shoppingCartRoutes = express.Router();

const shoppingCartsController = require('../controllers/shoppingCart-controller');
// const authHelpers = require('../services/auth/auth-helpers');

// root route, /api/shopping-carts
shoppingCartRoutes.get('/', shoppingCartsController.index);

// show details for an specific user shopping-cart route, /api/shopping-carts/:id
shoppingCartRoutes.get('/', shoppingCartsController.show);

// add new shopping-cart route, /api/shopping-carts/add 
shoppingCartRoutes.post('/', shoppingCartsController.create);

// delete shopping-cart route, /api/shopping-carts/:id
shoppingCartRoutes.delete('/:id', shoppingCartsController.delete);

// show all buyer's cart outfits route given user_id, /api/shopping-carts/shopping_cart_item/:id
shoppingCartRoutes.get('/shopping_cart_item/', shoppingCartsController.showBuyerCartItems);

// get Shopping Cart Total Price By UserId route, GET /api/shopping-carts/total-price/:id
shoppingCartRoutes.get('/total-price/', shoppingCartsController.getTotalPriceByUserId);

module.exports = shoppingCartRoutes;