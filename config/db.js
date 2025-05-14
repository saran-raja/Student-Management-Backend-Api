require('dotenv').config();  

const Sequelize = require('sequelize');

// Ensure you check if the environment variables are loaded correctly
if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_HOST) {
  throw new Error("Missing required environment variables");
}

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql', // You can also use 'mariadb' if you're using MariaDB
  logging: false,  // Turn off logging if you don't want SQL queries printed to the console
  dialectOptions: {
    // Optional: If you're using SSL or have other options to configure for the connection
    ssl: {
      require: true,  // for SSL
      rejectUnauthorized: false // This can vary depending on your DB provider
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
