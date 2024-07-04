const express = require("express");
const app = express();
const port = 8080;
const router = require("./routes/route");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine","pug");
app.set("views", "./views");
app.use("/form", router);
app.listen(port, () => {
  console.log("port runnning on", port);
});
 