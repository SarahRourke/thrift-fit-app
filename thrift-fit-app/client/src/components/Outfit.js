import React from 'react';
import { Link } from 'react-router-dom';

const Outfit = (props) => {
    return (
        <div className="outfit">
            <img src={props.outfit.img_url} alt={props.outfit.id} />
            <h3>{props.outfit.description}</h3>
            <Link to={`/outfit/${props.outfit.id}`}>See more by this USER_NAME here</Link>
        </div>
    );
};

export default Outfit;