// calendarRoutes.js
const express = require('express');
const calendarController = require('../controllers/calendarController');

const router = express.Router();

// Add Event to Calendar
router.post('/addEvent/:userId', async (req, res) => {
  const { userId } = req.params;
  const { eventName, eventDate } = req.body;

  try {
    await calendarController.addEventToCalendar(userId, eventName, eventDate);
    res.status(201).json({ message: 'Event added to calendar successfully' });
  } catch (error) {
    console.error('Error adding event to calendar:', error.message);
    res.status(500).json({ error: 'Error adding event to calendar' });
  }
});

// Get All Events for User
router.get('/getAllEvents/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const events = await calendarController.getAllEventsForUser(userId);
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events for user:', error.message);
    res.status(500).json({ error: 'Error fetching events for user' });
  }
});

// Get Event by ID
router.get('/getEvent/:eventId', async (req, res) => {
  const { eventId } = req.params;

  try {
    const event = await calendarController.getEventById(eventId);
    res.status(200).json(event);
  } catch (error) {
    console.error('Error fetching event by ID:', error.message);
    res.status(500).json({ error: 'Error fetching event by ID' });
  }
});

// Update Event
router.put('/updateEvent/:eventId', async (req, res) => {
  const { eventId } = req.params;
  const { eventName, eventDate } = req.body;

  try {
    await calendarController.updateEvent(eventId, eventName, eventDate);
    res.status(200).json({ message: 'Event updated successfully' });
  } catch (error) {
    console.error('Error updating event:', error.message);
    res.status(500).json({ error: 'Error updating event' });
  }
});

// Delete Event
router.delete('/deleteEvent/:eventId', async (req, res) => {
  const { eventId } = req.params;

  try {
    await calendarController.deleteEvent(eventId);
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error.message);
    res.status(500).json({ error: 'Error deleting event' });
  }
});

module.exports = router;
