const db = require('../db/config');
const Outfit = require('../models/Outfit');

class ShoppingCart {
    constructor(cart) {
        this.id = cart.id || null;
        this.user_id = cart.user_id;
        this.shopping_cart_item = cart.shopping_cart_item;
        this.is_sale_completed = cart.is_sale_completed || false;            
    }

    // get all shopping carts
    static getAll() {
        return db
        .manyOrNone('SELECT * FROM shopping_carts ORDER BY id ASC')
        .then((shoppingCarts) => shoppingCarts.map((shoppingCart) => 
            new this(shoppingCart))
        );
    }

    // create new shopping cart
    save() {
        return db
        .one(
            `INSERT INTO shopping_carts (user_id, shopping_cart_item, is_sale_completed)
             VALUES ($/user_id/, $/shopping_cart_item/, $/is_sale_completed/)
             RETURNING *
            `,
            this
        )
        .then((shoppingCart) => Object.assign(this, shoppingCart));
    }

    // get all outfits from buyer's cart given it's user_id as parameter.
    static getAllItems(user_id) {
        return db
        .manyOrNone(`
            SELECT * FROM outfits
                JOIN shopping_carts 
                ON outfits.id = shopping_carts.shopping_cart_item
            WHERE shopping_carts.user_id = ${user_id};`)
        .then((items) => {
            return items.map((item) => {
            return new Outfit(item);
            });
        });
    }

    // get an specific shopping cart by user_id
    static getByUserId(id) {
        return db
        .manyOrNone('SELECT * FROM shopping_carts WHERE user_id = $1', [id])
        .then((shoppingCarts) => {
          if (shoppingCarts){
            return shoppingCarts.map((shoppingCart) => {
                return new this(shoppingCart);
            });            
          } 
          throw new Error(` User ${id} not found`);
        });
    }

    // get an specific shopping cart
    static getById(id) {
        return db
        .oneOrNone('SELECT * FROM shopping_carts WHERE id = $1', [id])
        .then((shoppingCart) => {
          if (shoppingCart) return new this(shoppingCart);
          throw new Error(`Shopping Cart ${id} not found`);
        });
    }
     
    // delete a shopping cart
    delete() {
        return db.oneOrNone('DELETE FROM shopping_carts WHERE id = $1', this.id);
    }
}

module.exports = ShoppingCart;