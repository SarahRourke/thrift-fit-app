import React from 'react';

import { Link } from 'react-router-dom';

import SearchBarForm from './SearchBarForm';

const Header = (props) => {
  return (
    <header className="header">
      <div className="logo">Thrift-Fit-App</div>
      <SearchBarForm />
        <div class="navbar">
          <a><Link to="/">Home</Link></a>
            <div class="dropdown">
              <button class="dropbtn">Profile
                <i class="fa fa-caret-down"></i>
              </button>
                <div class="dropdown-content">
                  <a><Link to="/login">Login</Link></a> <a><Link to="/dashboard">Dashboard</Link></a>
                  <a><Link to="/register">Register</Link></a>
                  <a onClick={props.logout}><Link to="/">Logout</Link></a>
                </div>
            </div>
        <a><Link to="/shopping-cart">Shopping Cart</Link></a>
        <div class="dropdown">
          <button class="dropbtn">Outfits
          <i class="fa fa-caret-down"></i>
          </button>
          <div class="dropdown-content">
              <a><Link to="/outfits">All Outfits</Link></a>
              
          </div>
        </div> 
      </div>
    </header>
  );
};

export default Header;