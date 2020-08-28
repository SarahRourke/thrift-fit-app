import React, { Component } from 'react';

class OutfitEditForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: props.outfit ? props.outfit.description : '',
            img: props.outfit ? props.outfit.imgsrc : '',
        }
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
            <form onSubmit={(
                this.props.isAdd
                ? (e) => this.props.handleFormSubmit('POST', e, this.state)
                : (e) => this.props.handleFormSubmit('PUT', e, this.state, this.props.outfit.id)
            )}>
                <input type="text" name="description" placeholder="Describe your outfit here..." value={this.state.description} onChange={this.handleChange} />
                <input type="text" name="img" placeholder="img goes here" value={this.state.img} onChange={this.handleChange} />
                <input type="submit" value={this.props.isAdd ? 'Add this outfit' : 'Edit this outfit'} />
            </form>    
            )
        
        
    }   

}

export default OutfitEditForm;