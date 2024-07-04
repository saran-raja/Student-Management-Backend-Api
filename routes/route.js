const express = require("express");
const router = express.Router();
const usercontroller = require("../controller/userController")


router.get("/getAll",usercontroller.getAll);
router.post("/submit",usercontroller.addStudent);
router.get("/result",usercontroller.Result);
router.get("/FetchResult",usercontroller.FetchResult)
module.exports = router;