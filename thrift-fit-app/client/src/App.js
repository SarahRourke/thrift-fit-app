import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import SideBar from './components/SideBar'
import OutfitAddForm from './components/OutfitAddForm';

class App extends Component {
  constructor() {
    super();
    this.state = {
      auth: false,
      user: null,
    }
  }

  componentDidMount() {
    fetch('/api/auth/verify', { credentials: 'include' })
      .then(res => res.json())
      .then(res => {
        this.setState({
          auth: res.auth,
          user: res.data.user,
        })
      }).catch(err => console.log(err));
  }

  handleLoginSubmit = (e, data) => {
    e.preventDefault();
    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      this.setState({
        auth: res.auth,
        user: res.data.user
      })
    }).catch(err => console.log(err));
  }

  handleRegisterSubmit = (e, data) => {
    e.preventDefault();
    fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      this.setState({
        auth: res.auth,
        user: res.data.user
      })
    }).catch(err => console.log(err));
  }

  logout = () => {
    fetch('/api/auth/logout', {
      credentials: 'include',
    })
    .then(res => res.json())
    .then(res => {
      this.setState({
        auth: res.auth,
        user: res.data.user,
      })
    }).catch(err => console.log(err))
  }

  render() {
    return (
      <Router>
        <div className="App">

          <Header logout={this.logout}/>
          {(this.state.auth) 
          ? <SideBar user={this.state.user.id}/>
          : ''}
          

          <div className="container">

            <Route exact path='/' component={Home} />

            <Route exact path='/login' render={() => (
              this.state.auth
              ? <Redirect to='/dashboard' />
              : <Login handleLoginSubmit={this.handleLoginSubmit} />
            )} />

            <Route exact path='/register' render={() => (
              this.state.auth
              ? <Redirect to='/dashboard' />
              : <Register handleRegisterSubmit={this.handleRegisterSubmit} />
            )} />

             <Route exact path='/dashboard' render={() => (
              !this.state.auth
              ? <Redirect to='/login' />
              : <Dashboard  user={this.state.user} />
            )} />
        
          <div className='outfitcontainer'>

            {/* <Route exact path='/outfits' render={() => ( <OutfitsController currentPage='index' outfits={this.state.outfits} />)} /> */}
            
            <Route exact path='/outfits/new' render={() => (<OutfitAddForm />)} />

            {/* <Route exact path='/outfits/update/:id' 
            render={props => (<OutfitsController currentPage='update' currentId={props.match.params.id} />)} /> */}

          </div>
          </div>

          <Footer />

        </div>
      </Router>
    );
  }
}

export default App;