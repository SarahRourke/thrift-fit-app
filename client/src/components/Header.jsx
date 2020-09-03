import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import SearchBarForm from './SearchBarForm';

const Header = (props) => {
  return (
    <header className="header headernav">
      
      <div className="logo">Thrift-Fit-App</div>
      <SearchBarForm />
        <div className="navbar">
          <Link to="/">Home</Link>
            <div className="dropdown">
              <button className="dropbtn">Profile
                <i className="fa fa-caret-down"></i>
              </button>
                <div className="dropdown-content">
                  <Link to="/login">Login</Link> <Link to="/dashboard">Dashboard</Link>
                  <Link to="/register">Register</Link>
                  <Link onClick={props.logout} to="/">Logout</Link>
                </div>
            </div>
        
        <div className="dropdown">
          <button className="dropbtn">Outfits
          <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-content">
              <Link to="/outfits">All Outfits</Link>
          </div><Link to="/shopping-cart">Shopping Cart</Link>
        </div> 
      </div>
      
    </header>
    
  );
};

export default Header;