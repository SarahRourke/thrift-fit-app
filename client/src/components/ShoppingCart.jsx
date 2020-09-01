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
            user: props.user.id,
            addItem: props.addItemIdToCart,
        }
        this.deleteCartItem = this.deleteCartItem.bind(this);
    }

    componentDidMount() {        
        if (this.state.addItem) {            
            // add that item to the shopping_cart_item
            this.addItemIdToCart(this.state.addItem);
        }
        this.getAllCartItemsByUserId();
        
    }

    addItemIdToCart(outfit_id) {        
        fetch(`/api/shopping-carts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                user_id: this.state.user,
                shopping_cart_item: outfit_id
            })
        })
        .then(res => res.json())
        .then(res => {
            this.getAllCartItemsByUserId();
        });
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

    // delete shopping cartItem giving its id.
    deleteCartItem(id) {        
        fetch(`/api/shopping-carts/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        }).then(res => res.json())
        .then(res => {
            this.getAllCartItemsByUserId();
        }).catch(err => console.log(err));
    }

    renderCartItems() {      
        if (this.state.dataLoaded) {
            return this.state.cartItems.map(outfit => {
                return <ShoppingCartItem key={outfit.id} outfit={outfit} 
                        deleteCartItem={this.deleteCartItem}/>
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