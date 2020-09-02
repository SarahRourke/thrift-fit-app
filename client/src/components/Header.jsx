import React from 'react';

import { Link } from 'react-router-dom';

import SearchBarForm from './SearchBarForm';

const Header = (props) => {
  return (
    <header className="header">
      <div className="logo">Thrift-Fit-App</div>
      <SearchBarForm />
        <div class="navbar">
          <Link to="/">Home</Link>
            <div class="dropdown">
              <button class="dropbtn">Profile
                <i class="fa fa-caret-down"></i>
              </button>
                <div class="dropdown-content">
                  <Link to="/login">Login</Link> <Link to="/dashboard">Dashboard</Link>
                  <Link to="/register">Register</Link>
                  <Link onClick={props.logout} to="/">Logout</Link>
                </div>
            </div>
        <Link to="/shopping-cart">Shopping Cart</Link>
        <div class="dropdown">
          <button class="dropbtn">Outfits
          <i class="fa fa-caret-down"></i>
          </button>
          <div class="dropdown-content">
              <Link to="/outfits">All Outfits</Link>
              
          </div>
        </div> 
      </div>
    </header>
  );
};

export default Header;