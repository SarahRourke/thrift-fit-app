import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './outfits.css';

class Outfit extends Component{

    decideWhichToRender(){
        if(this.props.userPage){
            return <div className="card" key={this.props.outfits.id}>
                {/* <div className="card-content"> */}
                <img sizes="293px" src={this.props.outfits.img_url} alt="image" />
                
                <div className="card-content">
                    <a>@{this.props.outfits.user_id}</a>
                    <span >{this.props.outfits.description}</span>
                    <br />
                {/* <div className="card-action"> */}
                    {this.props.otherUser ? <span onClick={() => this.props.handleOnClickAddToCart(this.props.outfits.id)}>Add To Cart
                    </span> : ''}
                </div>
            </div>
        }
        else{
            return <div className="card" key={this.props.outfits.outfit.id}>
                {/* <div className="card-content"> */}
                <img sizes="293px" src={this.props.outfits.outfit.img_url} alt="image" />
                
                <div className="card-content">
                    <a>@{this.props.outfits.outfit.user_id}</a>
                    <span >{this.props.outfits.outfit.description}</span>
                    <br />
                    <Link to={`/user/${this.props.outfits.user.username}`} 
                    onClick={() => this.props.otherUserFunction(this.props.outfits.outfit.user_id)}>
                        See more by {this.props.outfits.user.username}
                        </Link>
                {/* <div className="card-action"> */}
                    <span onClick={() => this.props.handleOnClickAddToCart(this.props.outfits.outfit.id)}>Add To Cart
                    </span>  
                </div>
            </div>
        }
    }

    render(){
        return (
            <div>
                {this.decideWhichToRender()}
            </div>
        );
    }
};

export default Outfit;
