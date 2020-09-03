import React, { Component } from 'react';
import './forms.css';
class OutfitAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: props.edit ? props.outfit.value.description : '',
            img_url: props.edit ? props.outfit.value.description  : '',
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
            <>
            <div className="form">
            <form className="outfitform"
            onSubmit={(e) => this.props.handleOutfitSubmit('POST', e, this.state)}>
              

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

                <input type="submit" value='Add this outfit'/>
            </form>
            </div>  
            </>  
        );
        
        
    }   

}

export default OutfitAddForm;