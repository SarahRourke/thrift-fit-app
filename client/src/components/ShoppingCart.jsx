import React, { Component } from 'react';

import ShoppingCartItem from './ShoppingCartItem';
import ShoppingCartForm from './ShoppingCartForm';
import './shoppingcart.css';
import './outfits.css';


class ShoppingCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems: null,
            dataLoaded: false,             
            cartTotalPrice: 0.00,
            totalPriceLoaded: false,
            itemCounter: 0,
            shippingPriceArray: [],
            shippingTotal: 0,
            shippingLoaded: false,
            totalPrice: 0,
            totalPriceLoaded: false
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
        .then(res => {
            this.setState({
                cartTotalPrice: res.data.total_price.sum,
                totalPriceLoaded: true,
            })
        }).catch(err => console.log(err));
    }


    getShippingPrice(element) {
        fetch(`/api/shopping-carts/shopping_cart_shipping/${element.user_id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            console.log(res.shippingCost.cost[6].shipping_amount.amount)
            const newShippingPriceArray = this.state.shippingPriceArray.concat(res.shippingCost.cost[6].shipping_amount.amount)
            this.setState({
                shippingPriceArray: newShippingPriceArray,
            })
        }).then(res => {
            const shippingTotal = this.state.shippingPriceArray.reduce((a, b) => a + b, 0);
            this.setState({
                shippingTotal: shippingTotal,
            })
        }).then(res => {
            console.log(this.state.shippingPriceArray)
            console.log(this.state.shippingTotal)
        }).catch(err => console.log(err));
    }


    
    // show all items that are on the logged user's cart.
    getAllCartItemsByUserId() {
        fetch(`/api/shopping-carts/shopping_cart_item/`, {credentials: 'include',})
        .then(res => res.json())
        .then(res => {
            console.log(res)
            this.setState({
                cartItems: res.data.outfits,
                dataLoaded: true,  
                itemCounter: res.data.outfits.map((element, index) => { 
                    if(element.id > 0) {
                        return index
                    }
                }),
            })
        }).then(res => {
            let i = 0
            this.state.cartItems.forEach(element => {
                this.getShippingPrice(element)
                i++
                console.log(this.state.shippingLoaded)
                if(i === this.state.cartItems.length-1){
                    this.calcTotal()
                    this.setState({
                        shippingLoaded: true,
                    })
                }
                
            })
        }).then(res => {
            console.log(this.state.shippingTotal)
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
    handleFormSubmit = () => {
        // map throughout cartItems and update status for each outfit that is on the cart.
        this.state.cartItems.forEach(element => {
            console.log(element)
            // fetch to back-end api & update outfits status is_sold to true
            this.deleteCartItem(element.id)
            fetch(`/api/outfits/${element.shopping_cart_item}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    is_sold: new Boolean(true),
                }),
            })
            .then(res => res.json())           
            .catch(err => console.log(err));
        })
       
        alert(`Your order is being reviewed, please expect an email from the seller.`);      
    }
    
    // show all cart items. 
    renderCartItems() {      
        if (this.state.dataLoaded) {
            return this.state.cartItems.map(outfit => {
                return <ShoppingCartItem key={outfit.id} outfit={outfit} 
                        deleteCartItem={this.deleteCartItem}/>
            })
        } else return <p>Loading...</p>;
    }

    // renderTotal(){
    //     if (this.state.shippingLoaded){
    //         return <div>
    //             <h3>Total: ${this.state.totalPrice}</h3>
    //             </div>
    //         }else {
    //             return <p>Calculating Total...</p>
    //         }
    // }


    renderShipping() {
        if (this.state.shippingLoaded){
        return <div>
            <h3>Shipping: ${this.state.shippingTotal}</h3>
            {/* {this.renderTotal()} */}
            </div>
        }else {
            return <p>Calculating Shipping Cost...</p>
        }
    }

    renderSubTotal() {
        if (this.state.totalPriceLoaded) {
            return <div>
                <h3>Subtotal: ${this.state.cartTotalPrice}</h3>
                {this.renderShipping()}
            </div>
        } else {
            return <p>Loading Subtotal...</p>
        }
    }

    // if car is empty, show message: your car is empty.
    // else, show subtotal / items count / Checkout button (ShoppingCartForm).
    isCartEmpty() {
        if (this.state.itemCounter.length >0 ) {            
            return <div>
                {this.renderSubTotal()}
                <h4>Items: {this.state.itemCounter.length} </h4>                
                <ShoppingCartForm handleFormSubmit={this.handleFormSubmit} cartItems={this.state.cartItems} cartTotalPrice={this.state.cartTotalPrice} shippingTotal={this.state.shippingTotal}/>
            </div>             
        } else {
            return <h4>Your cart is empty!</h4>
        }
    }

    render() {
         return(

            <div>
                <div className="row">
                    {this.renderCartItems()}
                </div>
                
                
                {this.isCartEmpty()}                

            </div>
         )       
    }
}

export default ShoppingCart;