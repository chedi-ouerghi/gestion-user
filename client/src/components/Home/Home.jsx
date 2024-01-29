// Home.js
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import ProfilePage from '../../pages/ProfilePage';
import CalendarPage from '../../pages/CalendarPage';
import Weather from '../Weather/Weather';
import NoteList from '../Notes/NoteList';
import NoteForm from '../Notes/NotesForm';

const Home = () => {
  return (
    <div style={{ display: 'flex' }}>
      <h1>Home Page</h1>
      <Sidebar />
      <div>
        <Routes>
          <Route path="/home" element={<h2>Home Content</h2>} />
          <Route path="/profile/:userId/*" element={<ProfilePage />} />

          <Route path="/calendar" element={<CalendarPage />} />

          <Route path="/weather/:userId" element={<Weather />} />
          <Route path="/notes" exact element={<NoteList/>} />
        <Route path="/notes/:id" element={<NoteForm/>} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
