// handle shopping cart checkout feature.
import React, { Component } from 'react';

class ShoppingCartForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems: props.cartItems || [],                       
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    // checkout
    handleFormSubmit() {
        // map throughout cartItems and update status for each outfit that is on the cart.
        this.state.cartItems.map((outfitToUpdate) => {
            // fetch to back-end api & update outfits status is_sold to true
            fetch(`/api/outfits/${outfitToUpdate.shopping_cart_item}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    is_sold: new Boolean(true),
                }),
            })
            .then (res => res.json())            
            .catch(err => console.log(err));
        });
        // show message: Your order is being reviewed, please expect an email from the seller.
        alert('Your order is being reviewed, please expect an email from the seller.');      
    }

    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <input type="submit" value='Checkout'/>
            </form>
        )
    }
 
}

export default ShoppingCartForm;