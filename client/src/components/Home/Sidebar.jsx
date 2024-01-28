
// Sidebar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const { pathname } = useLocation();
  const userId = pathname.split('/profile/')[1];

  return (
    <div>
      <h2>Sidebar</h2>
      <ul>
        <li>
          {/* Use an absolute path for the Home link */}
          <Link to="/home">Home</Link>
        </li>
        <li>
          {/* Use an absolute path for the Profile link */}
          <Link to={`/profile/${userId}`}>Profile</Link>
        </li>
        <li>
          {/* Use an absolute path for the Calendar link */}
          <Link to="/calendar">Calendar</Link>
        </li>
        <li>
          {/* Include the city parameter in the Weather link */}
          <Link to={`/weather/${userId}`}>Weather</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
