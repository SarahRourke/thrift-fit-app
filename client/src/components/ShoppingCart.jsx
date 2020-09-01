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
            return this.state.cartItems.map(outfit => {
                return <ShoppingCartItem key={outfit.id} outfit={outfit} />
            })
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