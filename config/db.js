require('dotenv').config();  

const { Sequelize } = require('sequelize');

// Ensure required environment variables are set
if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_HOST) {
  throw new Error("Missing required environment variables");
}

 const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres', // ✅ changed from 'mysql' to 'postgres'
  port: 5432, // ✅ default port for PostgreSQL
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // This is often required for managed DBs like Neon
    }
  },
});

db.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });


  
module.exports = db;
