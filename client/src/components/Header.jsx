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
        <a><Link to="/login">Login</Link></a>
        <a><Link to="/register">Register</Link></a>
        <a><Link to="/shopping-cart">Shopping Cart</Link></a>
        <div class="dropdown">
          <button class="dropbtn">Dropdown
          <i class="fa fa-caret-down"></i>
          </button>
          <div class="dopdown-content">
              <a><Link to="/dashboard">Dashboard</Link></a>
              <a><Link to="/outfits">Outfits</Link></a>
              <a><span onClick={props.logout}>Logout</span></a>
          </div>
        </div> 
      </div>
    </header>
  );
};

export default Header;