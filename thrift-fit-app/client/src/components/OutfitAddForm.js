import React, { Component } from 'react';

class OutfitAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
            description: '',
            img_url: '',
        }
       
    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,
        });
    }


        handleAddOutfitSubmit = (e, data) => {
            console.log(this.state.user_id)
            console.log(data)
            data.user_id = this.props.user.id
            e.preventDefault();
            fetch(`/api/outfits/`, {
                method: 'POST',
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
            <form className="addOutfitForm"
            onSubmit={(e) => this.handleAddOutfitSubmit(e, this.state)}>
              

                <input 
                type="text" 
                name="description" 
                value={this.state.description || ''}  
                placeholder="Describe your outfit here..." 
                onChange={this.handleChange} />


                <input 
                type="text" 
                name="img_url" 
                value={this.state.img_url || ''} 
                placeholder="img_url goes here" 
                
                onChange={this.handleChange} />

                <input type="submit" value='Add this outfit' />
            </form>
            </div>  
            </div>  
        );
        
        
    }   

}

export default OutfitAddForm;