const sql = require('mssql');
const bcrypt = require('bcrypt');
const dbConfig = require('../config/config');

const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    if (!email) {
      console.error('Email is required for registration');
      return res.status(400).json({ error: 'Email is required for registration' });
    }

    const hash = await bcrypt.hash(password, 10);
    const pool = await sql.connect(dbConfig);

    // Inserting user information into [Users] table
    const insertUserResult = await pool.request()
      .query(`INSERT INTO [Users] (FirstName, LastName, Email) VALUES ('${firstName}', '${lastName}', '${email}'); SELECT SCOPE_IDENTITY() AS UserID`);

    const userId = insertUserResult.recordset[0].UserID;

    // Inserting authentication information into [Auth] table
    const insertAuthResult = await pool.request()
      .input('UserID', sql.Int, userId)
      .input('Email', sql.NVarChar(100), email)
      .input('PasswordHash', sql.NVarChar(255), hash)
      .query(`INSERT INTO [Auth] (UserID, Email, PasswordHash) VALUES (@UserID, @Email, @PasswordHash)`);

    await pool.close();

    console.log('Registration successful:', { userId, email });
    res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Registration failed:', error.message);
    res.status(500).json({ error: 'Registration failed' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const pool = await sql.connect(dbConfig);

    // Retrieving user authentication information
    const result = await pool.request()
      .input('Email', sql.NVarChar(100), email)
      .query('SELECT * FROM [Auth] WHERE [Email] = @Email');

    const user = result.recordset[0];

    if (!user) {
      console.error('Invalid email or password');
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.PasswordHash);

    if (!isPasswordValid) {
      console.error('Invalid email or password');
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Create a user session here if necessary

    console.log('Login successful:', { userId: user.UserID, email });
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Login failed:', error.message);
    res.status(500).json({ error: 'Login failed' });
  }
};

const logout = (req, res) => {
  // Gérer le processus de déconnexion ici
  res.status(200).json({ message: 'Logout successful' });
};

module.exports = { register, login, logout };
