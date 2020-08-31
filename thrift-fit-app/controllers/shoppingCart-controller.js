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

// get details for an specific shopping cart by its user_id
ShoppingCartController.show = (req, res, next) => {
  ShoppingCart.getByUserId(req.params.id)
    .then((shoppingCart) => {
      res.json({
        message: 'ok',
        data: { shoppingCart },        
      });
    })
    .catch(next);
};

// create new shopping cart
ShoppingCartController.create = (req, res, next) => {
  new ShoppingCart({
    user_id: req.body.user_id,
    shopping_cart_item: req.body.shopping_cart_item,
  })
    .save()
    .then((newShoppingCart) => {
      res.json({
        message: 'Shopping Cart added successfully!',
        data: { newShoppingCart },
      });
    })
    .catch(next);
};

// delete a shopping cart
ShoppingCartController.delete = (req, res, next) => {
    ShoppingCart.getById(req.params.id)
      .then((shoppingCart) => shoppingCart.delete())
      .then(() => {
        res.json({
          message: 'Shopping Cart deleted successfully!',
        });
      })
      .catch(next);
};

// get all outfits from buyer's cart given it's user_id.
ShoppingCartController.showBuyerCartItems = (req, res, next) => {
  ShoppingCart.getAllItems(req.params.id)
    .then((outfits) => {
      res.json({
        message: 'ok',
        data: { outfits },
      });
    })
    .catch(next);
}
  
  module.exports = ShoppingCartController;