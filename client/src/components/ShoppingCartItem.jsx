// show cart_item(outfit) details
import React from 'react';

const ShoppingCartItem = (props) => {
    return (
        <div className="shopping-cart-item">
            <img src={props.outfit.img_url} alt={props.outfit.id} />
            <h3>{props.outfit.description}</h3>
        </div>
    );
};

export default ShoppingCartItem;