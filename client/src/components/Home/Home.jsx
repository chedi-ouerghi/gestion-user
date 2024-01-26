// Home.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import ProfilePage from '../../pages/ProfilePage';
import CalendarPage from '../../pages/CalendarPage';

const Home = () => {
  return (
    <div style={{display:'flex'}}>
      <h1>Home Page</h1>
      <Sidebar />
      <div>
        <Routes>
          <Route path="/home" element={<h2>Home Content</h2>} />
          {/* Render ProfilePage component within the Home page */}
                  <Route path="/profile" element={<ProfilePage />} />
                      <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
