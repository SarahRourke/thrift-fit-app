import React, { Component } from 'react';

import OutfitAddForm from './OutfitAddForm'

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
      data.user_id = this.props.user.id
      fetch(`/api/outfits/${id || ''}`, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(data),
      }).then(res => res.json())
          .then(res => {
            console.log(res); 
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
    fetch('/api/outfits/user', 
    { credentials: 'include' })
        .then(res => res.json())
        .then(res => {
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
      if(this.state.dataLoaded === false){
        return <h1>You have no outfits yet</h1>
      }
      else{
        return <div>
        <h1>Hello {this.props.user.username}!</h1>
        <button onClick={() => this.setPage('add')}>Add a outfit</button>
        {this.state.outfits.map((value, i) => {
          return <div> 
            <p key={i}>{value.description}</p> 
            <button onClick={() => this.edit(value)}>edit</button>
            </div>
        })}
        </div>
      }
    }
    else if(this.state.page === 'add'){
      return <OutfitAddForm user={this.props.user} handleOutfitSubmit={this.handleOutfitSubmit} edit={false}/>
    }
    else{
      return <OutfitAddForm user={this.props.user} handleOutfitSubmit={this.handleOutfitSubmit} edit={true} outfit={this.state.outfit}/>
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