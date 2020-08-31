import React from 'react';

import { Link } from 'react-router-dom';

import SearchBarForm from './SearchBarForm';

const Header = (props) => {
  return (
    <header className="header">
      <div className="logo">Thrift-Fit-App</div>
      <SearchBarForm />
      <nav>
        <ul>Nav:
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/outfits">Outfits</Link></li>
          <li><Link to="/shopping-cart">Shopping Cart</Link></li>
          <li><span onClick={props.logout}>Logout</span></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;