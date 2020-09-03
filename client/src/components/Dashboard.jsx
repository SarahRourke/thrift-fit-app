import React, { Component } from 'react';

import OutfitAddForm from './OutfitAddForm'

import UserPage from './UserPage'

class Dashboard extends Component {
  constructor(props){
    super(props)
    this.state = {
      page: 'default',
      outfits: [],
      dataLoaded: false,
      outfit: null,
    }
  }

  componentDidMount(){
    this.getAllOutfits()
  }

  handleOutfitSubmit = (method, e, data, id) => {
    e.preventDefault();
    this.setPage('default')
    // data.user_id = this.props.user.id
    fetch(`/api/outfits/${id || ''}`, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
    }).then(res => res.json())
        .then(res => {
          this.getAllOutfits()
        }).catch(err => console.log(err));
    }

  setPage = (page) => {
    this.setState({
      page: page,
    })
  }

  edit = (value) => {
    this.setPage('edit');
    this.setState({
      outfit: {value}
    })
  }

  getAllOutfits = () => {
    fetch(`/api/outfits/user/${this.props.user.id}`, 
    { credentials: 'include' })
        .then(res => res.json())
        .then(res => {
            console.log(res.data.outfits)
            this.setState({
                outfits : res.data.outfits,
                dataLoaded: true,
            });
        }).then(res => {
          console.log(this.state.outfits)
        }).catch(err => console.log(err));
}



  decideWhichToRender = () => {
    if(this.state.page === 'default'){
      return <div>
        <button onClick={() => this.setPage('add')}>Add a outfit</button>
        {((this.state.dataLoaded === false) ? <h1>You have no outfits yet</h1> : <UserPage user={this.props.user} outfits={this.state.outfits} edit={this.edit}/>)}
      </div>
    }
    else if(this.state.page === 'add'){
      return <OutfitAddForm handleOutfitSubmit={this.handleOutfitSubmit} edit={false}/>
    }
    else{
      return <OutfitAddForm handleOutfitSubmit={this.handleOutfitSubmit} edit={true} outfit={this.state.outfit}/>
    }
  }


  render(){
    return (
      <div className="dash">
          {this.decideWhichToRender()}
      </div>
    )
  }
}

export default Dashboard;