// show cart_item(outfit) details
import React from 'react';

const ShoppingCartItem = (props) => {
    return (
        <div className="card" key={props.outfit.id}>
        <img sizes="293px" src={props.outfit.img_url} alt="cool outfit goes here" />
        <div className="card-content">
            <span>{props.outfit.description}</span>
            <br />
            <h4>Price: ${props.outfit.price}</h4>
            <span className="delete" onClick={() => 
                props.deleteCartItem(props.outfit.id)}>
                    Delete
            </span>
        
        </div>
        </div>
    );
};

export default ShoppingCartItem;