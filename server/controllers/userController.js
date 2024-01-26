const sql = require('mssql');
const dbConfig = require('../config/config');
const calendarController = require('../controllers/calendarController');


const getAllUsers = async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query('SELECT * FROM Users');
    
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ error: 'Error fetching users' });
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request()
      .input('UserId', sql.Int, userId)
      .query('SELECT * FROM Users WHERE UserID = @UserId');
    
    const user = result.recordset[0];

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error.message);
    res.status(500).json({ error: 'Error fetching user' });
  }
};

const createUser = async (req, res) => {
  const { firstName, lastName, email, country, city, dateOfBirth, gender } = req.body;

  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request()
      .input('FirstName', sql.NVarChar(50), firstName)
      .input('LastName', sql.NVarChar(50), lastName)
      .input('Email', sql.NVarChar(100), email)
      .input('Country', sql.NVarChar(50), country)
      .input('City', sql.NVarChar(50), city)
      .input('DateOfBirth', sql.Date, dateOfBirth)
      .input('Gender', sql.NVarChar(10), gender)
      .query(`
        INSERT INTO Users (FirstName, LastName, Email, Country, City, DateOfBirth, Gender)
        OUTPUT INSERTED.UserID
        VALUES (@FirstName, @LastName, @Email, @Country, @City, @DateOfBirth, @Gender)
      `);

    if (result.rowsAffected[0] > 0) {
      const userId = result.recordset[0].UserID;

      // Automatically add birthday event to the user's calendar
      const birthdayDate = new Date(dateOfBirth);
      await calendarController.addEventToCalendar(userId, 'Birthday', birthdayDate);

      res.status(201).json({ message: 'User created successfully', userId });
    } else {
      res.status(500).json({ error: 'Error creating user: UserID not available in the response' });
    }
  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(500).json({ error: 'Error creating user' });
  }
};


const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { firstName, lastName, country, city, dateOfBirth, gender } = req.body;

  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request()
      .input('UserId', sql.Int, userId)
      .input('FirstName', sql.NVarChar(50), firstName)
      .input('LastName', sql.NVarChar(50), lastName)
      .input('Country', sql.NVarChar(50), country)
      .input('City', sql.NVarChar(50), city)
      .input('DateOfBirth', sql.Date, dateOfBirth)
      .input('Gender', sql.NVarChar(10), gender)
      .query('UPDATE Users SET FirstName = @FirstName, LastName = @LastName, Country = @Country, City = @City, DateOfBirth = @DateOfBirth, Gender = @Gender WHERE UserID = @UserId');

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Remove the old birthday event from the calendar
    const oldUser = await getUserById(req, res); // Assuming you have a method to fetch user details by ID
    if (oldUser) {
      const oldBirthdayDate = new Date(oldUser.DateOfBirth);
      await calendarController.deleteEventByDate(userId, 'Birthday', oldBirthdayDate);
    }

    // Add the updated birthday event to the calendar
    const birthdayDate = new Date(dateOfBirth);
    await calendarController.addEventToCalendar(userId, 'Birthday', birthdayDate);

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error.message);
    res.status(500).json({ error: 'Error updating user' });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request()
      .input('UserId', sql.Int, userId)
      .query('DELETE FROM Users WHERE UserID = @UserId');

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error.message);
    res.status(500).json({ error: 'Error deleting user' });
  }
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
