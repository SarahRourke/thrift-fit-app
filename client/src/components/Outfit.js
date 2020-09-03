import React from 'react';
import { Link } from 'react-router-dom';
import './outfits.css';

const Outfit = (props) => {
    return (
        <div className="card" key={props.outfits.outfit.id}>
            {/* <div className="card-content"> */}
            <img sizes="293px" src={props.outfits.outfit.img_url} alt="image" />
            
            <div className="card-content">
                <a>@{props.outfits.outfit.user_id}</a>
                <span >{props.outfits.outfit.description}</span>
                <br />
                <Link to={`/user/${props.outfits.user.username}`} 
                onClick={() => props.otherUserFunction(props.outfits.outfit.user_id)}>
                    See more by {props.outfits.user.username}
                    </Link>
            {/* <div className="card-action"> */}
                <span onClick={() => props.handleOnClickAddToCart(props.outfits.outfit.id)}>Add To Cart
                </span>  
            </div>
        </div>
    );
};

export default Outfit;
