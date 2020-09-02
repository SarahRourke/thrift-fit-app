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
                this.setState({
                    outfits : res.data.outfits,
                    dataLoaded: true,
                });
            }).catch(err => console.log(err));
    }

    handleOnClickAddToCart(outfit_id) {           
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
            <div className="row">
                
                    {this.state.outfits.map((outfit) => {
                        
                        return <Outfit outfit={outfit} key={outfit.id} handleOnClickAddToCart={this.handleOnClickAddToCart} />
                    
                    
                    })}               
                </div>
            
        )
    }

    
};

export default AllOutfits;
