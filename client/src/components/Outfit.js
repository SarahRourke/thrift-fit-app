import React from 'react';
import { Link } from 'react-router-dom';
import './outfits.css';

const Outfit = (props) => {
    return (
        <>
        <div className="card">
            <div className="card-image">
            <img src={props.outfit.img_url} alt={props.outfit.key} />
            </div>
            <div className="card-content">
            <span className="card-title">{props.outfit.description}</span>
            <br />
            <Link to={`/outfits/${props.outfit.user_id}`}>See more by this USER_NAME here</Link>
            </div>
            <div className="card-action">
            <span className="add-to-cart" onClick={() => props.handleOnClickAddToCart(props.outfit.id)}>Add To Cart
            </span>
             </div>    
        </div>
        </>
    );
};

export default Outfit;