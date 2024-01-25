const dotenv = require('dotenv');
const sql = require('mssql');

dotenv.config();

const dbConfig = {
  user: process.env.DB_USER ,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER ,
  database: process.env.DB_DATABASE ,
  options: {
    trustedConnection: process.env.DB_TRUSTED_CONNECTION === 'true' ,
    encrypt: process.env.DB_ENCRYPT === 'true' ,
    enableArithAbort: process.env.DB_ENABLE_ARITH_ABORT === 'true',
  },
};

const testDatabaseConnection = async () => {
  try {
    const pool = await sql.connect(dbConfig);
    console.log('Database connection successful');
    await pool.close();
  } catch (error) {
    console.error('Database connection failed:', error.message);
  }
};

testDatabaseConnection();

module.exports = dbConfig;
