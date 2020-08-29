import React, { Component } from 'react';

import allOutfits from './allOutfits';
import OutfitEditForm from './OutfitEditForm';
import OutfitJustOne from './OutfitJustOne';

import { /*Link,*/ Redirect } from 'react-router-dom'

class OutfitsController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: props.currentPage,
            currentId: props.currentId || null,
            dataLoaded: false,
            allOutfits: null,
            currentOutfit: null,
            fireRedirect: false,
            redirectPath: null,
        }
        this.outfitSubmit = this.outfitSubmit.bind(this);
        this.outfitDelete = this.outfitDelete.bind(this);
    }

    componentDidMount() {
        if (this.state.currentPage === 'index') {
            fetch('/api/outfits')
            .then(res => res.json())
            .then(res => {
                this.setState({
                    allOutfits: res.data.outfits,
                    dataLoaded: true,
                });
            }).catch(err => console.log(err));
        } else if (this.state.currentPage === 'create' || this.state.currentPage === 'update') {
            fetch(`/api/outfits/${this.state.currentId}`)
                .then(res => res.json())
                .then(res => {
                    this.setState({
                    currentOutfit: res.data.outfit,
                    dataLoaded: true,
                    })
                }).catch(err => console.log(err));
        }   else if (this.state.currentPage === 'show') {
            this.setState({
                dataLoaded: true,
            })
        }
    }    
    

    outfitSubmit(method, e, data, id) {
        e.preventDefault();
        fetch(`/api/outfits/${id || ''}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })  .then(res => res.json())
            .then(res => {
                this.setState({
                fireRedirect: true,
                redirectPath: `/outfits/${res.data.outfit.id}`,
                })
            });
    }    

    outfitDelete(id) {
        fetch(`/api/outfits/${id}`, {
            method: 'DELETE',
        })  .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({
                    fireRedirect: true,
                    redirectPath: '/outfits',
                });
        }).catch(err => console.log(err));
    }

    decideWhichToRender() {
        switch (this.state.currentPage) {
            case 'index':
                return <allOutfits allOutfits={this.state.allOutfits} />;
                break;
            case 'show':
                return <OutfitJustOne outfit={this.state.currentOutfit} outfitDelete={this.outfitDelete} />;
                break;
            case 'create':
                return <OutfitEditForm isAdd={true} outfitSubmit={this.outfitSubmit} />;
                break;
            case 'update':
                return <OutfitEditForm isAdd={false} outfitSubmit={this.outfitSubmit} outfit={this.state.currentOutfit} />
                break;
        }
    }

    render() {
        return (
            <div className="container">
                {(this.state.dataLoaded) ? this.decideWhichToRender() : <p>Loading...</p>}
                {this.state.fireRedirect && <Redirect push to={this.state.redirectPath} />}
            </div>
        )
    }
}

export default OutfitsController;