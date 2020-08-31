import React from 'react';
import { Link } from 'react-router-dom';

const Outfit = () => {
    return (
        <div className="outfitcontainer">
        <div className="outfit">
            <img src={this.outfit.img_url} alt={this.outfit.id} />
            <h3>{this.outfit.description}</h3>
            <Link to={`/outfit/${this.outfit.id}`}>See more by this USER_NAME here</Link>
        </div>    
        </div>
    );
};

export default Outfit;