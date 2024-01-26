// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div>
      <h2>Sidebar</h2>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
              </li>
               <li>
          <Link to="/calendar">Calendar</Link>
        </li>
        
      </ul>
    </div>
  );
};

export default Sidebar;
