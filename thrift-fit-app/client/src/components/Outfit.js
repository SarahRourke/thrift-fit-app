import React from 'react';
import { Link } from 'react-router-dom';

const Outfit = (props) => {
    return (
        <div className="outfitcontainer">
        <div className="outfit">
            <img src={props.img_url} alt={props.id} />
            <h3>{props.description}</h3>
            <Link to={`/outfits/${props.id}`}>See more by this USER_NAME here</Link>
        </div>    
        </div>
    );
};

export default Outfit;