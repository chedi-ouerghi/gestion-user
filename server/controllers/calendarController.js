// calendarController.js
const sql = require('mssql');
const dbConfig = require('../config/config');

const addEventToCalendar = async (userId, eventName, eventDate) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request()
      .input('UserID', sql.Int, userId)
      .input('EventName', sql.NVarChar(100), eventName)
      .input('EventDate', sql.DateTime, eventDate)
      .query('INSERT INTO CalendarEvents (UserID, EventName, EventDate) VALUES (@UserID, @EventName, @EventDate)');

    return result;
  } catch (error) {
    console.error('Error adding event to calendar:', error.message);
    throw new Error('Error adding event to calendar');
  }
};

const getAllEventsForUser = async (userId) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request()
      .input('UserID', sql.Int, userId)
      .query('SELECT * FROM CalendarEvents WHERE UserID = @UserID');

    return result.recordset;
  } catch (error) {
    console.error('Error fetching events for user:', error.message);
    throw new Error('Error fetching events for user');
  }
};

const getEventById = async (eventId) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request()
      .input('EventId', sql.Int, eventId)
      .query('SELECT * FROM CalendarEvents WHERE EventID = @EventId');

    return result.recordset[0];
  } catch (error) {
    console.error('Error fetching event by ID:', error.message);
    throw new Error('Error fetching event by ID');
  }
};


const updateEvent = async (eventId, eventName, eventDate) => {
  try {
    const pool = await sql.connect(dbConfig);

    const eventNameToUpdate = eventName ? eventName : getEventById(eventId).EventName;

    const result = await pool.request()
      .input('EventId', sql.Int, eventId)
      .input('EventName', sql.NVarChar(100), eventNameToUpdate)
      .input('EventDate', sql.DateTime, eventDate)
      .query('UPDATE CalendarEvents SET EventName = @EventName, EventDate = @EventDate WHERE EventID = @EventId');

    return result;
  } catch (error) {
    console.error('Error updating event:', error.message);
    throw new Error('Error updating event');
  }
};


const deleteEvent = async (eventId) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request()
      .input('EventId', sql.Int, eventId)
      .query('DELETE FROM CalendarEvents WHERE EventID = @EventId');

    return result;
  } catch (error) {
    console.error('Error deleting event:', error.message);
    throw new Error('Error deleting event');
  }
};

module.exports = { addEventToCalendar, getAllEventsForUser, getEventById, updateEvent, deleteEvent };
