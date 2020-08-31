import React, { Component } from 'react';
import Outfit from './Outfit';


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
            <div className="outfitcontainer">
                {this.state.outfits.map((outfit, i) => {
                    return <div key={i}>
                        <p>{outfit.description}</p>
                        <p>{outfit.img_url}</p>
                         </div>

                })}
                <p>hello</p>
            </div>
        )
    }

    
};

export default AllOutfits;
