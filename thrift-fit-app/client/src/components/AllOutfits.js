import React, { Component } from 'react';

class AllOutfits extends Component {
    constructor(props) {
        super(props);
        this.state = {
            outfits: null,
            dataLoaded: false,
            auth: props.auth,
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
        } if (this.state.auth === true) {
            return this.handleFormSubmit(isAdd === true);
        }
        else return <p>Cleaning our closet...</p>;
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