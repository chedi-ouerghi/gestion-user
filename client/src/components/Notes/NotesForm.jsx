// NoteForm.js
import React, { useState, useEffect } from 'react';
import { useN, useNavigate } from 'react-router-dom';
import { Button, TextField, Paper, Typography, Container } from '@mui/material';
import Axios from 'axios';

const NoteForm = ({ match }) => {
  const navigate = useNavigate();
  const [note, setNote] = useState({ UserID: '', NoteText: '' });

  const isUpdate = match.params.id;

  useEffect(() => {
    if (isUpdate) {
      // Fetch note by ID if it's an update
      Axios.get(`http://localhost:5625/notes/notes/${isUpdate}`)
        .then((response) => {
          setNote({
            UserID: response.data.UserID.toString(),
            NoteText: `${response.data.NoteHeader}---${response.data.NoteBody}`,
          });
        })
        .catch((error) => console.error('Error fetching note by ID', error));
    }
  }, [isUpdate]);

  const handleChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const noteData = {
      UserID: parseInt(note.UserID),
      NoteText: note.NoteText,
    };

    if (isUpdate) {
      // Update existing note
      Axios.put(`http://localhost:5625/notes/notes/${isUpdate}`, noteData)
        .then((response) => console.log('Note updated successfully', response.data))
        .catch((error) => console.error('Error updating note', error));
    } else {
      // Create new note
      Axios.post('/api/notes', noteData)
        .then((response) => console.log('Note created successfully', response.data))
        .catch((error) => console.error('Error creating note', error));
    }

    // Redirect to NoteList after submission
    navigate('/notes');
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4">{isUpdate ? 'Update Note' : 'Create Note'}</Typography>
        <TextField
          label="UserID"
          type="number"
          name="UserID"
          value={note.UserID}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="NoteText"
          multiline
          rows={4}
          name="NoteText"
          value={note.NoteText}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {isUpdate ? 'Update Note' : 'Create Note'}
        </Button>
      </Paper>
    </Container>
  );
};

export default NoteForm;
