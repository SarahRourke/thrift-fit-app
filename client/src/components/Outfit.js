import React from 'react';
import { Link } from 'react-router-dom';
import './outfits.css';

const Outfit = (props) => {
    return (
        
        <div className="card" key={props.outfit.key}>
            {/* <div className="card-content"> */}
            <img sizes="293px" src={props.outfit.img_url} alt="image" />
            
            <div className="card-content">
                <a>@{props.outfit.user_id}</a>
                <span >{props.outfit.description}</span>
                <br />
                <Link to={`/outfits/${props.outfit.user_id}`}>See more by this USER_NAME here</Link>
            {/* <div className="card-action"> */}
                <span onClick={() => props.handleOnClickAddToCart(props.outfit.id)}>Add To Cart
                </span>  
                
            </div>
        </div>
    );
};

export default Outfit;