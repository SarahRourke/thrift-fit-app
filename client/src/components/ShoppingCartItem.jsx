// show cart_item(outfit) details
import React from 'react';

const ShoppingCartItem = (props) => {
    return (
        <div className="shopping-cart-item">
            <img src={props.img_url} alt={props.id} />
            <h3>props.description</h3>
        </div>
    );
};

export default ShoppingCartItem;