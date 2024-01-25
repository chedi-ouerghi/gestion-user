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

module.exports = { addEventToCalendar };
