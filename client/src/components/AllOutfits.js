import React, { Component } from 'react';
import Outfit from './Outfit';
import './outfits.css';


class AllOutfits extends Component {
    constructor(props) {
        super(props);
        this.state = {
            outfits: [],
            dataLoaded: false,
        }

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

    render() {
        return (
            
            <div className="card">
                
                {this.state.outfits.map((outfit, i) => {
                    return <div key={i}>
                        <img src={outfit.img_url} alt="add pic" />
                        <h2>{outfit.description}</h2>
                        <h4>{outfit.user_id}</h4>
                        </div>
                })}

            </div>
            
        )
    }

    
};

export default AllOutfits;
