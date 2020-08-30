const ShoppingCart = require('../models/ShoppingCart');

const ShoppingCartController = {};

// get all shopping carts
ShoppingCartController.index = (req, res, next) => {
    ShoppingCart.getAll()
    .then((shoppingCarts) => {
      res.json({
        message: 'ok',
        data: { shoppingCarts },        
      });
    })
    .catch(next);
};

// delete a shopping cart
// ShoppingCartController.delete = (req, res, next) => {
//     ShoppingCart.getById(req.params.id)
//       .then((shoppingCart) => shoppingCart.delete())
//       .then(() => {
//         res.json({
//           message: 'Shopping Cart deleted successfully!',
//         });
//       })
//       .catch(next);
//   };
  
  module.exports = ShoppingCartController;