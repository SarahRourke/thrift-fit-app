const express = require('express');
const shoppingCartRoutes = express.Router();

const shoppingCartsController = require('../controllers/shoppingCart-controller');
// const authHelpers = require('../services/auth/auth-helpers');

// root route, /api/shopping-carts
shoppingCartRoutes.get('/', shoppingCartsController.index);

// show details for an specific user shopping-cart route, /api/shopping-carts/:id
shoppingCartRoutes.get('/:id', shoppingCartsController.show);

// add new shopping-cart route, /api/shopping-carts/add 
shoppingCartRoutes.post('/', shoppingCartsController.create);

// delete shopping-cart route, /api/shopping-carts/:id
shoppingCartRoutes.delete('/:id', shoppingCartsController.delete);

module.exports = shoppingCartRoutes;