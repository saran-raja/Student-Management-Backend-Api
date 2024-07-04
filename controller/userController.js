const students = require("../model/userModel");
const sequelize = require("sequelize");

const getAll = async (req, res) => {
  try {
    const allStudents = await students.findAll();
    res.render("index", { students: allStudents });
  } catch (err) {
    console.log(err);
  }
};

const addStudent = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      address,
      qualification,
      degree,
      department,
      dob,
      age,
      rollNumber,
      mobileNumber,
    } = req.body;
    await students.create({
      firstName,
      lastName,
      address,
      qualification,
      degree,
      department,
      dob,
      age,
      rollNumber,
      mobileNumber,
    });
    const allStudents = await students.findAll();
    res.render("index", { students: allStudents });
  } catch (err) {
    res.send(err);
  }
};
const Result = async (req, res) => {
  try {
    res.render("result-page");
  } catch (err) {
    res.send(err);
  }
};

const FetchResult = async (req, res) => {
  try {
    const { rollNumber, dob } = req.query;    
    console.log(req.query);
    const student = await students.findOne({ where: { rollNumber, dob } });
    console.log("=>",student);
    if(!student){
          res.send("No student found")
    }
    else{
      res.render("result-page", { student }); 

    }
  } catch (err) {
    res.send(err);
  }
};

module.exports = { getAll, addStudent, FetchResult, Result };
