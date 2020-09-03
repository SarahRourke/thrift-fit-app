import React, { Component } from 'react';
import Outfit from './Outfit';
import './outfits.css';


class AllOutfits extends Component {
    constructor(props) {
        super(props);
        this.state = {
            outfits: [],
            dataLoaded: false,
            shoppingCartItem: null,
        }
        this.handleOnClickAddToCart = this.handleOnClickAddToCart.bind(this);
    }
        

    componentDidMount() {
       this.getAllOutfits();   
    }

    getAllOutfits = () => {
        fetch('/api/outfits', { credentials: 'include' })
            .then(res => res.json())
            .then(res => {
                console.log(res.data.outfits)
                this.setState({
                    outfits : res.data.outfits,
                    dataLoaded: true,
                });
            }).catch(err => console.log(err));
    }

<<<<<<< HEAD
    handleOnClickAddToCart(outfit_id) {   
        alert(`outfit id: ${outfit_id}`);
=======
    handleOnClickAddToCart(outfit_id) {           
>>>>>>> 2dff372290d9396f6fa976c5203e51914729fe98
        fetch(`/api/shopping-carts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                // user_id: this.state.user,
                shopping_cart_item: outfit_id
            })
        })
    }

    render() {
        return (
            <>
            <div className="row">
                
                    {this.state.outfits.map((outfits) => {
                        
                        return <Outfit 
                        outfits={outfits} 
                        key={outfits.outfit.id} 
                        handleOnClickAddToCart={this.handleOnClickAddToCart}
                        otherUserFunction={this.props.otherUserFunction} />
                    
                    
                    })}               
                </div>
            </>
        )
    }

    
};

export default AllOutfits;
