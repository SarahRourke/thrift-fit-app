import React, { Component } from 'react';

class OutfitEditForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: props.outfit ? props.outfit.user_id : '',
            is_sold: props.outfit ? props.outfit.is_sold : '',
            description: props.outfit ? props.outfit.description : '',
            img_url: props.outfit ? props.outfit.img_url : '',
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
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
            <form className={this.props.isAdd ? 'addform' : 'editform'} 
            onSubmit={
                this.props.isAdd
                ? e => this.props.handleFormSubmit('POST', e, this.state)
                : e => this.props.handleFormSubmit('PUT', e, this.state, this.props.outfit.id)
            }>
                <input type="text" name="description" placeholder="Describe your outfit here..." value={this.state.description} onChange={this.handleChange} />
                <input type="text" name="img_url" placeholder="img_url goes here" value={this.state.img_url} onChange={this.handleChange} />
                <input type="submit" value={this.props.isAdd ? 'Add this outfit' : 'Update this outfit'}  />
            </form>
            </div>  
            </div>  
        );
        
        
    }   

}

export default OutfitEditForm;