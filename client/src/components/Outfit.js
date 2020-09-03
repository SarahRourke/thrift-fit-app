import React from 'react';
import { Link } from 'react-router-dom';
import './outfits.css';

const Outfit = (props) => {
    return (
<<<<<<< HEAD
        <>
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
            
=======
        
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
>>>>>>> 2dff372290d9396f6fa976c5203e51914729fe98
        </div>
        </>
    );
};

export default Outfit;