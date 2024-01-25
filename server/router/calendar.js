const express = require('express');
const calendarController = require('../controllers/calendarController');

const router = express.Router();

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

module.exports = router;
