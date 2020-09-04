import React, { Component } from 'react';
import Outfit from './Outfit';
import './outfits.css';


class AllOutfits extends Component {
    constructor(props) {
        super(props);
        this.state = {
            outfits: [],
            availableOutfits: [],
            dataLoaded: false,
            shoppingCartItem: null,
        }
        this.handleOnClickAddToCart = this.handleOnClickAddToCart.bind(this);
    }
        

    componentDidMount() {
       this.getAllOutfits();   
       this.getAllAvailableOutfits();
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

    // show only available outfits, is_sold = false
    getAllAvailableOutfits = () => {
        fetch('/api/outfits/available', { credentials: 'include' })
            .then(res => res.json())
            .then(res => {                
                this.setState({
                    availableOutfits : res.data.outfits,
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
            <>
            <div className="row">
                
                    {this.state.availableOutfits.map((outfits) => {
                        
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