import React from 'react';
import { Link } from 'react-router-dom';
import './outfits.css';

const Outfit = (props) => {
    return (
        
        <div className="card">
            <div className="card-image">
                <img src={props.outfits.outfit.img_url} alt={props.outfits.outfit.key} />
            </div>
            <div className="card-content">
                <span className="card-title">{props.outfits.outfit.description}</span>
                <br />

                <Link to={`/user/${props.outfits.user.username}`} 
                onClick={() => props.otherUserFunction(props.outfits.outfit.user_id)}>
                    See more by {props.outfits.user.username}
                    </Link>

            </div>
            <div className="card-action">
                <span className="add-to-cart" onClick={() => props.handleOnClickAddToCart(props.outfits.outfit.id)}>Add To Cart
                </span>
             </div>    
        </div>
    );
};

export default Outfit;