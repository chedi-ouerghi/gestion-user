const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const notesController = require('../controllers/notesController');

const validateNote = [
  body('UserID').isInt().notEmpty(),
  body('NoteText').isString().notEmpty(),
];

// Routes
router.get('/notes', notesController.getAllNotes);
router.get('/notes/:id', notesController.getNoteById);
router.post('/notes', validateNote, notesController.createNote);
router.put('/notes/:id', validateNote, notesController.updateNoteById);
router.delete('/notes/:id', notesController.deleteNoteById);
router.delete('/notes', notesController.deleteAllNotes);

module.exports = router;
