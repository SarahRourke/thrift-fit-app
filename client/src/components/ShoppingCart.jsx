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
            cartTotalPrice: 0.00,
            totalPriceLoaded: false,
            itemCounter: 0,
        }
        this.deleteCartItem = this.deleteCartItem.bind(this);
        this.checkout = this.checkout.bind(this);
    }

    componentDidMount() {        
        this.getCartTotalPrice();
        this.getAllCartItemsByUserId();              
    }

    // set state with user's cart total price.
    getCartTotalPrice() {
        fetch(`/api/shopping-carts/total-price/`)
        .then(res => res.json())
        .then(res => {
            this.setState({
                cartTotalPrice: res.data.total_price.sum,
                totalPriceLoaded: true,
            })
        }).catch(err => console.log(err));
    }

    getAllCartItemsByUserId() {          
        fetch(`/api/shopping-carts/shopping_cart_item/`, {credentials: 'include',})
        .then(res => res.json())
        .then(res => {
            this.setState({
                cartItems: res.data.outfits,
                dataLoaded: true,  
                itemCounter: res.data.outfits.map((element, index) => { 
                    if(element.id > 0) {
                        return index
                    }
                }),
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
            this.getCartTotalPrice();
        }).catch(err => console.log(err));
    }

    // checkout
    checkout() {
        alert('checkout!');
    }

    renderCartItems() {      
        if (this.state.dataLoaded) {
            return this.state.cartItems.map(outfit => {
                return <ShoppingCartItem key={outfit.id} outfit={outfit} 
                        deleteCartItem={this.deleteCartItem}/>
            })
        } else return <p>Loading...</p>;
    }

    renderSubTotal() {
        if (this.state.totalPriceLoaded) {
            return <h3>Subtotal: ${this.state.cartTotalPrice}</h3>            
        } else {
            return <p>Loading Subtotal</p>
        }
    }

    isCartEmpty() {
        if (this.state.itemCounter.length >0 ) {            
            return <div>
                {this.renderSubTotal()}
                <h4>Items: {this.state.itemCounter.length} </h4>
                <span className="checkout" onClick={this.checkout}>Checkout</span>
            </div>             
        } else {
            return <h4>Your cart is empty!</h4>
        }
    }

    render() {
         return(
            <div className="shopping-cart">
                {this.renderCartItems()}
                {this.isCartEmpty()}                
            </div>
         )       
    }
}

export default ShoppingCart;
