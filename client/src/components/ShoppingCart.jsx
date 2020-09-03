// call the back-end shopping cart route
// GET /api/shopping-carts/shopping_cart_item/:id
import React, { Component } from 'react';

import ShoppingCartItem from './ShoppingCartItem';

class ShoppingCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems: null,
<<<<<<< HEAD
            dataLoaded: false,
            // user: props.user.id,      
            cartTotalPrice: 0.00,
            totalPriceLoaded: false,
=======
            dataLoaded: false,             
            cartTotalPrice: 0.00,
            totalPriceLoaded: false,
            itemCounter: 0,
>>>>>>> 2dff372290d9396f6fa976c5203e51914729fe98
        }
        this.deleteCartItem = this.deleteCartItem.bind(this);
    }

    componentDidMount() {        
        this.getCartTotalPrice();
        this.getAllCartItemsByUserId();              
    }

    // set state with user's cart total price.
    getCartTotalPrice() {
        fetch(`/api/shopping-carts/total-price/`)
        .then(res => res.json())
<<<<<<< HEAD
        .then(res => {
            console.log(`Here is the price ${res.data.total_price.sum}`);
=======
        .then(res => {            
>>>>>>> 2dff372290d9396f6fa976c5203e51914729fe98
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
<<<<<<< HEAD
            return <h3>
                {console.log(this.state.cartTotalPrice)}
=======
            return <h3>                
>>>>>>> 2dff372290d9396f6fa976c5203e51914729fe98
                <h3>Subtotal: ${this.state.cartTotalPrice}</h3>
            </h3>
        } else {
            return <p>Loading Subtotal</p>
        }
    }

<<<<<<< HEAD
=======
    isCartEmpty() {
        if (this.state.itemCounter.length >0 ) {            
            return <div>
                {this.renderSubTotal()}
                <h4>Items: {this.state.itemCounter.length} </h4>
            </div>             
        } else {
            return <h4>Your cart is empty!</h4>
        }
    }

>>>>>>> 2dff372290d9396f6fa976c5203e51914729fe98
    render() {
         return(
            <div className="shopping-cart">
                {this.renderCartItems()}
                <div className= "total_price-cart">
<<<<<<< HEAD
                    {this.renderSubTotal()}
=======
                    {this.isCartEmpty()}
>>>>>>> 2dff372290d9396f6fa976c5203e51914729fe98
                </div>
            </div>
         )       
    }
}

export default ShoppingCart;