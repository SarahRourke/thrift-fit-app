import React from 'react';
import { Link } from 'react-router-dom';

const Outfit = (props) => {
    return (
        <div className="outfitcontainer">
        <div className="outfit">
            <img src={props.outfit.img_url} alt={props.outfit.key} />
            <h3>{props.outfit.description}</h3>
            <Link to={`/outfits/${props.outfit.user_id}`}>See more by this USER_NAME here</Link>
            <span className="add-to-cart" onClick={() => props.handleOnClickAddToCart(props.outfit.id)}>Add To Cart
            </span>
        </div>    
        </div>
    );
};

export default Outfit;