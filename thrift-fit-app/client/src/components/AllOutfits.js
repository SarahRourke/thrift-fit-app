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
        this.getAllOutfits();
    } 
    
    getAllOutfits() {
        fetch('/api/outfits'/*,{ credentials: 'include' }*/)
        .then(res => res.json())
        .then(res => {
            this.setState({
                outfits: res.data.outfits,
                dataLoaded: true,
            })
        }).catch(err => console.log(err));
    }

    handleFormSubmit(method, e, data, id) {
        e.preventDefault()
        fetch(`/api/outfits/${id || ''}`, {
            method: method,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            this.getAllOutfits();
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