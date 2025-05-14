const express = require("express");
const app = express();
const port = process.env.PORT ||8081;
const router = require("./routes/route");
const cors = require('cors');
const bcrypt = require("bcrypt")
// const bodyParser = require('body-parser');

// app.use(bodyParser.json()); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use("/form", router);
// app.use("/",router)
app.listen(port, () => {
  console.log("port runnning on", port);
});
sequelize.sync({ force: false })  
.then(() => {
  console.log("Database synced");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch((error) => {
  console.error("Failed to sync database:", error);
});