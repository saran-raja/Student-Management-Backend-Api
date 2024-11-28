const students = require("../model/studentModel");
const result = require("../model/resultModel");
const sequelize = require("sequelize");

const getAll = async (req, res,next) => {
  try {
    const allStudents = await students.findAll();
    res.json(allStudents);
  } catch (err) {
    console.log(err);
  }
};
const addUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      address,
      qualification,
      customQualification,
      degree,
      department,
      dob,
      age,
      rollNumber,
      admissionType,
      mobileNumber,
    } = req.body;

    console.log(req.body);
    const addStudent = await students.create({
      firstName,
      lastName,
      address,
      qualification: customQualification || qualification,
      degree,
      department,
      dob,
      age,
      rollNumber,
      admissionType,
      mobileNumber,
    });
    res.status(201).json({
      message: "User created successfully",
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error while creating the user",
      status: "error",
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { rollNumber } = req.params;
    console.log(req.params);

    console.log("id is " + rollNumber);

    const deleteStudents = await students.destroy({
      where: {
        rollNumber: rollNumber,
      },
    });
    console.log("deleteStudents", deleteStudents);

    res.json({ message: "User deleted successfully..", status: "success" });
  } catch (err) {
    console.log(err);
    res.json({ message: "Error", status: "error" });
  }
};
const updateUser = async (req, res) => {
  try {
    const {
      id,
      firstName,
      lastName,
      address,
      qualification,
      customQualification,
      degree,
      department,
      dob,
      age,
      rollnumber,
      admissionType,
      mobileNumber,
    } = req.body;
    console.log(req.body);

    await students.update(
      {
        firstName,
        lastName,
        address,
        qualification: qualification || customQualification,
        degree,
        department,
        dob,
        age,
        rollnumber,
        admissionType,
        mobileNumber,
      },
      { where: { id } }
    );

    res.status(201).json({
      message: "User Updated successfully..",
      status: "success",
    });
    console.log("Update successful");
  } catch (error) {
    console.log(error);
    res.status(201).json({
      message: "Unable to Update User",
      status: "error",
    });
  }
};

const rollnumber = async (req, res) => {
  try {
    const maxValue = await students.max("rollNumber");
    console.log("Maximum value:", maxValue);
    res.status(201).json(Number(maxValue) + 1);
  } catch (error) {
    console.error("Error finding max value:", error);
  }
};

module.exports = { getAll, addUser, deleteUser, updateUser, rollnumber };
