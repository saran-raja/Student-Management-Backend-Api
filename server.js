require('dotenv').config();  
const express = require("express");
const cors = require('cors');
const router = require("./routes/route");
const db = require("./config/db"); // This is your Sequelize instance

const app = express();
const PORT = process.env.PORT || 8081;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/form", router);

// Only call app.listen once DB is synced
db.sync({ force: false })  // change to true only if you want to drop and recreate tables
  .then(() => {
    console.log("Database synced");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to sync database:", error);
  });
