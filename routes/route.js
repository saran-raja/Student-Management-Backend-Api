const express = require("express");
const router = express.Router();
const usercontroller = require("../controller/userController");
const resultcontroller = require("../controller/resultController");
const authController = require("../controller/authController");
const verifyToken = require("../controller/verifyToken");
router.post("/register", authController.register);
router.get("/role", authController.getRoles);
router.post("/login", authController.login);
router.use(verifyToken);
router.get("/getAll", usercontroller.getAll);
router.post("/addUser", usercontroller.addUser);
router.delete("/deleteUser/:rollNumber", usercontroller.deleteUser);
router.put("/updateUser/:rollNumber", usercontroller.updateUser);
router.post("/addMarks", resultcontroller.addMarks);
router.post("/viewResult", resultcontroller.viewResult);
router.post("/addSubject", resultcontroller.addSubject);
router.post("/viewSubject", resultcontroller.viewSubject);
router.post("/findMarks", resultcontroller.findMarks);
router.put("/updateMarks/:rollNumber/:semester", resultcontroller.updateMarks);
router.get("/getAllMarks/:rollNumber", resultcontroller.getAllMarks);
router.delete("/deleteMarks/:rollNumber", resultcontroller.deleteMarks);
router.get("/rollnumber", usercontroller.rollnumber);

router.get("/viewMarks/:rollNumber", resultcontroller.viewMarks);

module.exports = router;
