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
            cartTotalPrice: null,
            totalPriceLoaded: false,
        }
        this.deleteCartItem = this.deleteCartItem.bind(this);
    }

    componentDidMount() {        
        this.getCartTotalPrice();
        this.getAllCartItemsByUserId();              
    }

    // set state with user's cart total price.
    getCartTotalPrice() {
        fetch(`/api/shopping-carts/total-price/${this.state.user}`)
        .then(res => res.json())
        .then(res => {
            console.log(`Here is the price ${res.data.total_price.sum}`);
            this.setState({
                cartTotalPrice: res.data.total_price.sum,
                totalPriceLoaded: true,
            })
        }).catch(err => console.log(err));
    }

    getAllCartItemsByUserId() {          
        fetch(`/api/shopping-carts/shopping_cart_item/${this.state.user}`)
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

    renderSubTotal() {
        if (this.state.totalPriceLoaded) {
            return <h3>
                {console.log(this.state.cartTotalPrice)}
                <h3>Subtotal: ${this.state.cartTotalPrice}</h3>
            </h3>
        } else {
            return <p>Loading Subtotal</p>
        }
    }

    render() {
         return(
            <div className="shopping-cart">
                {this.renderCartItems()}
                <div className= "total_price-cart">
                    {this.renderSubTotal()}
                </div>
            </div>
         )       
    }
}

export default ShoppingCart;