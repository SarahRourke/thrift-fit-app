import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import AllOutfits from './components/AllOutfits';

class App extends Component {
  constructor() {
    super();
    this.state = {
      auth: false,
      user: null,
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <div className="container">
            <Route exact path='/' component={Home} />
            <Route exact path='/outfits' render={() => <AllOutfits /* auth={this.state.auth} */ />} />
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;