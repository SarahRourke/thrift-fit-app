const db = require('../db/config');
const Outfit = require('../models/Outfit');

class ShoppingCart {
    constructor(cart) {
        this.id = cart.id || null;
        this.user_id = cart.user_id;
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
            `INSERT INTO shopping_carts (user_id)
             VALUES ($/user_id/)
             RETURNING *
            `,
            this
        )
        .then((shoppingCart) => Object.assign(this, shoppingCart));
    }

    // get all items from an specific cart
    // static getAllItems() {
    //     return db
    //     .manyOrNone(`
    //         SELECT * FROM outfits
    //             JOIN shopping_cart_items 
    //             ON outfits.id = shopping_cart_items.item_id
    //         WHERE shopping_cart_items.cart_id = ${this.id};`)
    //     .then((items) => {
    //         return items.map((item) => {
    //         return new Outfit(item);
    //         });
    //     });
    // }

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