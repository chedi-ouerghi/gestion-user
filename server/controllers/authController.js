const sql = require('mssql');
const bcrypt = require('bcrypt');
const dbConfig = require('../config/config');

const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    const pool = await sql.connect(dbConfig);
    
    const result = await pool.request()
      .input('FirstName', sql.NVarChar(50), firstName)
      .input('LastName', sql.NVarChar(50), lastName)
      .input('Email', sql.NVarChar(100), email)
      .input('PasswordHash', sql.NVarChar(255), hash)
      .execute('sp_RegisterUser'); 
    
    await pool.close();
    
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
    const result = await pool.request()
      .input('Email', sql.NVarChar(100), email)
      .execute('sp_GetUserByEmail'); // Utilisez une procédure stockée pour récupérer l'utilisateur par email

    const user = result.recordset[0];
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.PasswordHash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Créer une session utilisateur ici si nécessaire

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
