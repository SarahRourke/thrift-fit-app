import React, { Component } from 'react';

import { Link } from 'react-router-dom';

const OutfitJustOne = (props) => {
    return (
        <div className="outfit-justone">
            <div className="outfit-details">
                <div className="img">
                    <img src={props.outfit.img_url} alt={props.outfit.description} />
                </div>
                <div className="details">
                    <h3 className="soldby">{props.outfit.user_id}</h3>
                    <p>{props.outfit.description}</p>
                        <Link to={`/outfit/edit/${props.outfit.id}`}>Edit</Link>
                        <span className="delete" onClick={() => props.outfitDelete(props.outfit.id)}>Delete</span>
                </div>
            </div>
        </div>
    )
}

export default OutfitJustOne;