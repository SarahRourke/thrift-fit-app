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
            addItem: props.addItem,
        }
        this.deleteCartItem = this.deleteCartItem.bind(this);
    }

    componentDidMount() {
        alert(`${this.state.addItem}`);
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