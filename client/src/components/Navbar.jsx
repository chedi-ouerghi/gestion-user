import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/notes">Notes</Link></li>
        <li><Link to="/calendar">Calendar</Link></li>
        <li><Link to="/weather">Weather</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
