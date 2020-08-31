import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = (props) => {
  return (
    <div className="dash">
      <h1>Hello {props.user.username}!</h1>
      <Link to="/outfits/new">Add an outfit!</Link>
    </div>
  )
}

export default Dashboard;