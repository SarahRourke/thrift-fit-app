// call the back-end shopping cart route
// GET /api/shopping-carts/shopping_cart_item/:id
import React, { Component } from 'react';

import ShoppingCartItem from './ShoppingCartItem';

class ShoppingCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems: null,
            dataLoaded: false,
            user: props.user,
        }
    }

    componentDidMount() {
        this.getAllCartItemsByUserId();
    }

    getAllCartItemsByUserId() {        
        fetch(`/api/shopping-carts/shopping_cart_item/${1}`)
        .then(res => res.json())
        .then(res => {
            this.setState({
                cartItems: res.data.outfits,
                dataLoaded: true,                
            })
        }).catch(err => console.log(err));
    }

    renderCartItems() {      
        if (this.state.dataLoaded) {
            return <h1>Our cart items will go here!</h1>
          } else return <p>Loading...</p>;
    }

    render() {
         return(
            <div className="shopping-cart">
                {this.renderCartItems()}
            </div>
         )       
    }
}

export default ShoppingCart;