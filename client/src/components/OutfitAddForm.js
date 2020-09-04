import React, { Component } from 'react';
import './forms.css';
class OutfitAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: props.edit ? props.outfit.value.description : '',
            img_url: props.edit ? props.outfit.value.description  : '',
            price: props.edit ? props.outfit.value.price : '',
        }
    }

    componentDidMount(){
        if(this.props.edit){
            console.log(this.props.outfit)
        }
    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,
        });
    }

    render() {
        return (
            <div className="outfitcontainer">
            <div className="outfitform">
            <form className="addOutfitForm"
            onSubmit={(
                this.props.edit
                ? (e) => this.props.handleOutfitSubmit('PUT', e, this.state, this.props.outfit.value.id)
                : (e) => this.props.handleOutfitSubmit('POST', e, this.state))}>
              

                <input 
                type="text" 
                name="description" 
                value={this.state.description || ''}  
                placeholder={this.props.edit ? this.props.outfit.value.description : "Describe your outfit here..." }
                onChange={this.handleChange} />


                <input 
                type="text" 
                name="img_url" 
                value={this.state.img_url || ''} 
                placeholder={this.props.edit ? this.props.outfit.value.img_url : "img_url goes here"}
                
                onChange={this.handleChange} />

                <input
                type="numeric"
                name="price"
                value={this.state.price || ''}
                placeholder={this.props.edit ? this.props.outfit.value.price : "price"}

                onChange={this.handleChange} />

                <input type="submit" value={(this.props.edit ? 'Edit this outfit!' : 'Add this outfit!')}/>
            </form>
            </div>  
            </div>  
        );
        
        
    }   

}

export default OutfitAddForm;