// NoteList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Container } from '@mui/material';
import Axios from 'axios';
// NoteList.js
// ... (autres imports)

const NoteList = () => {
  const [notes, setNotes] = useState([]);

useEffect(() => {
  // Fetch all notes on component mount
  Axios.get('http://localhost:5625/notes/notes')
    .then((response) => {
      console.log('API Response:', response);
      console.log('API Data:', response.data);

      // Vérifiez si la réponse est vide
      if (response.data === '') {
        console.warn('Empty response received from the server.');
      } else {
        // Essayez de convertir la réponse en JSON
        try {
          const jsonData = JSON.parse(response.data);

          // Vérifiez si la conversion en JSON est réussie et que jsonData est un tableau
          if (Array.isArray(jsonData)) {
            setNotes(jsonData);
          } else {
            console.error('Invalid data format received from the server:', jsonData);
          }
        } catch (error) {
          console.error('Error parsing JSON data:', error);
        }
      }
    })
    .catch((error) => console.error('Error fetching all notes', error));
}, []);



  return (
    <Container maxWidth="md">
      {notes.map((note) => (
        <Card key={note.NoteID} style={{ margin: '10px' }}>
          <CardContent>
            <Typography variant="h5">{note.NoteHeader}</Typography>
            <Typography variant="body2">{note.NoteBody}</Typography>
            <Button component={Link} to={`/notes/${note.NoteID}`} color="primary">
              Update Note
            </Button>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default NoteList;
