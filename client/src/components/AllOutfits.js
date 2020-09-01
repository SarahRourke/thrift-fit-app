import React, { Component } from 'react';
import Outfit from './Outfit';


class AllOutfits extends Component {
    constructor(props) {
        super(props);
        this.state = {
            outfits: [],
            dataLoaded: false,
            shoppingCartItem: null,
        }
        this.handleOnClickAddToCart = this.handleOnClickAddToCart.bind(this);
    }
        

    componentDidMount() {
       this.getAllOutfits();   
    }

    getAllOutfits = () => {
        fetch('/api/outfits', { credentials: 'include' })
            .then(res => res.json())
            .then(res => {
                this.setState({
                    outfits : res.data.outfits,
                    dataLoaded: true,
                });
            }).catch(err => console.log(err));
    }

    handleOnClickAddToCart(id) { 
        this.props.onAddItemToCartClick(id);
        this.setState({
            shoppingCartItem: id,
        });  
    }

    render() {
        return (
            <div className="outfitcontainer">
                {this.state.outfits.map((outfit) => {
                    return <Outfit outfit={outfit} key={outfit.id} handleOnClickAddToCart={this.handleOnClickAddToCart} />
                })}               
            </div>
        )
    }

    
};

export default AllOutfits;
