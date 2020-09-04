// show cart_item(outfit) details
import React from 'react';

const ShoppingCartItem = (props) => {
    return (
        <div className="shopping-cart-item">
           <div className="shopping-cart-card">
            <img src={props.outfit.img_url} alt={props.outfit.id} />
            </div>
            <h3>{props.outfit.description}</h3>
            <h4>Price: ${props.outfit.price}</h4>
            <span className="delete" onClick={() => 
                props.deleteCartItem(props.outfit.id)}>
                    Delete
            </span>
        </div>
    );
};

export default ShoppingCartItem;