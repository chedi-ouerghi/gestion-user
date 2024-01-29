const { validationResult } = require('express-validator');
const sql = require('mssql'); // Importez le module mssql
const dbConfig = require('../config/config');

// Contrôleur pour récupérer toutes les notes
const getAllNotes = async (req, res) => {
  try {
        const pool = await sql.connect(dbConfig);
    const result = await pool.query('SELECT * FROM Notes');
    res.json(result.rows);
  } catch (error) {
    console.error('Error getting notes', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getNoteById = async (req, res) => {
  const noteId = req.params.id;

  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request()
      .input('noteId', sql.Int, noteId)
      .query('SELECT * FROM Notes WHERE NoteID = @noteId');

    if (result.recordset.length > 0) {
      res.json(result.recordset[0]);
    } else {
      res.status(404).json({ error: 'Note not found' });
    }
  } catch (error) {
    console.error('Error getting note by ID', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const createNote = async (req, res) => {
  const { UserID, NoteText } = req.body;

  // Vérifiez si NoteText existe et contient '---' avant de le séparer
  const [NoteHeader, NoteBody] = NoteText && NoteText.includes('---') ? NoteText.split('---', 2) : ['', ''];

  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request()
      .input('UserID', sql.Int, UserID)
      .input('NoteHeader', sql.NVarChar(sql.MAX), NoteHeader.trim())
      .input('NoteBody', sql.NVarChar(sql.MAX), NoteBody.trim())
      .input('CreatedAt', sql.DateTime, new Date())
      .query('INSERT INTO Notes (UserID, NoteHeader, NoteBody, CreatedAt) OUTPUT INSERTED.* VALUES (@UserID, @NoteHeader, @NoteBody, @CreatedAt)');

    res.status(201).json(result.recordset[0]);
  } catch (error) {
    console.error('Error creating note:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateNoteById = async (req, res) => {
  const noteId = req.params.id;
  const { NoteText } = req.body;

  // Vérifiez si NoteText existe et contient '---' avant de le séparer
  const [NoteHeader, NoteBody] = NoteText && NoteText.includes('---') ? NoteText.split('---', 2) : ['', ''];

  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.query`
      UPDATE Notes
      SET NoteHeader = ${NoteHeader.trim()}, NoteBody = ${NoteBody.trim()}
      OUTPUT INSERTED.*
      WHERE NoteID = ${noteId}`;

    if (result.recordset.length > 0) {
      res.json(result.recordset[0]);
    } else {
      res.status(404).json({ error: 'Note not found' });
    }
  } catch (error) {
    console.error('Error updating note by ID', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




// Contrôleur pour supprimer une note par ID
const deleteNoteById = async (req, res) => {
  const noteId = req.params.id;

  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.query`
      DELETE FROM Notes
      OUTPUT DELETED.*
      WHERE NoteID = ${noteId}`;

    if (result.recordset.length > 0) {
      res.json({ message: 'Note deleted successfully' });
    } else {
      res.status(404).json({ error: 'Note not found' });
    }
  } catch (error) {
    console.error('Error deleting note by ID', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Contrôleur pour supprimer toutes les notes
const deleteAllNotes = async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    await pool.query('DELETE FROM Notes');
    res.json({ message: 'All notes deleted successfully' });
  } catch (error) {
    console.error('Error deleting all notes', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  updateNoteById,
  deleteNoteById,
  deleteAllNotes,
};
