import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import './styling/theme.css';
import SearchBarForm from './SearchBarForm';

const Header = (props) => {
  return (
    <header className="header headernav">
      
      <div className="logo">thrift fit</div>
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
        {/* <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavbar">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link"><Link to="/">Home</Link></a>
            </li>
            <li class="nav-item"><a class="nav-link"><Link to="/login">Login</Link></a></li>
            <li class="nav-item"><a class="nav-link"><Link to="/dashboard">Dashboard</Link></a></li>
            <li class="nav-item"><a class="nav-link"><Link to="/register">Register</Link></a></li>
          </ul>
        </div>
       */}
      </div>
      
    </header>
    
  );
};

export default Header;