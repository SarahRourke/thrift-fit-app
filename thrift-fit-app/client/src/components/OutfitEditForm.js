import React, { Component } from 'react';

class OutfitEditForm extends Component {
    constructor(props) {
        super(props);
        this.state = {

            description: this.props.description,
            img_url: this.props.img_url,

        }
    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,
        });
    }

    handleEditOutfitSubmit = (e, data) => {
        console.log(data)
        data.user_id = this.props.user.user_id
        e.preventDefault();
        fetch(`/api/outfits/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(data),
        }).then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({ 

                    description : res.data.description,
                    img_url : res.data.img_url

                })
            }).catch(err => console.log(err));
    }

    render() {
        return (
            <div className="outfitcontainer">
                <div className="outfitform">
                    <form className="editOutfitForm"
                    onSubmist={(e) => this.handleEditOutfitSubmit(e, this.state)}>

                        <input
                        type="text"
                        name="description"
                        value={this.state.description || ''}
                        placeholder="update your description here..."
                        onChange={this.hanldeChange} />

                        <input 
                        type="text"
                        name="img_url"
                        value={this.state.img_url || ''}
                        placeholder="Add a different picture of your outfit"
                        onChange={this.handleChange} />

                        <input type="submit" value="add your changes!" />
                    </form>
                </div>
            </div>
        );
    }
}

export default OutfitEditForm;