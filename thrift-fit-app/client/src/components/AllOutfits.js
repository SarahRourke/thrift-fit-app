import React, { Component } from 'react';

class AllOutfits extends Component {
    constructor() {
        super();
        this.state = {
            outfits: null,
            dataLoaded: false,
        }
    }

    componentDidMount() {
        fetch('/api/outfits'/*,{ credentials: 'include' }*/)
        .then(res => res.json())
        .then(res => {
            this.setState({
                outfits: res.data.outfits,
                dataLoaded: true,
            })
        }).catch(err => console.log(err));
    }

    renderAllOutfits() {
        if (this.state.dataLoaded) {
            return this.state.outfits.map(outfit => {
                return <Outfit key={outfit.id} outfit={outfit} />
            })
        } else return <p>Cleaning our closet...</p>;
    }

    render() {
        return (
            <div className="alloutfits">
                {this.renderAllOutfits()}
            </div>
        )
    }
}

export default AllOutfits;