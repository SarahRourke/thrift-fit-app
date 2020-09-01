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
        this.setShoppingCartItem = this.setShoppingCartItem.bind(this);
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
            }).then(res => {console.log(this.state.outfits)}).catch(err => console.log(err));
        
    }

    setShoppingCartItem(id) {
        console.log(`here is the id: ${id}`);
        this.setState({
            shoppingCartItem: id,
        })        
    }

    render() {
        return (
            <div className="outfitcontainer">
                {this.state.outfits.map((outfit) => {
                    return <Outfit outfit={outfit} key={outfit.id} setShoppingCartItem={this.setShoppingCartItem} />
                })}               
            </div>
        )
    }

    
};

export default AllOutfits;
