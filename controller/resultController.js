const { Op } = require("sequelize");

const sequelize = require("sequelize");
// const students = require("../model/userModel");
const subject = require("../model/subjectModel");
const marksModel = require("../model/marksModel");
const student = require("../model/studentModel");
const result = require("../model/resultModel");
const marks = require("../model/marksModel");

const addSubject = async (req, res) => {
  try {
    const { rollNumber, semester, subjects } = req.body;
    console.log(req.body);

    for (const subj of subjects) {
      await subject.create({
        rollNumber,
        semester,
        coursecode: subj.courseCode,
        subjectname: subj.subjectName,
      });
    }

    res.status(201).json({
      message: "Subject Added Successfully",
      status: "success",
    });
  } catch (error) {
    console.error(error);
    res.json({
      message: "Failled to add Subject",
      status: "error",
    });
  }
};

const addMarks = async (req, res) => {
  const { rollNumber, coursecode, semester, mark } = req.body;
  console.log(req.body);

  try {
    await marksModel.create({
      rollNumber,
      coursecode,
      semester,
      mark,
    });
    res.status(201).json({
      message: "Marks added successfully",
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(201).json({
      message: "Unable to add marks",
      status: "success",
    });
  }
};

const viewSubject = async (req, res) => {
  try {
    const { rollNumber, semester } = req.body;

    const subjectsWithMarks = await marksModel.findAll({
      where: {
        rollNumber,
        semester,
      },
      attributes: ["coursecode"],
    });
    // console.log("subjectsWithMarks",subjectsWithMarks.map((mark)=>mark.coursecode));

    const coursecodesWithMarks = subjectsWithMarks.map(
      (mark) => mark.coursecode
    );

    const subjectsWithoutMarks = await subject.findAll({
      where: {
        rollNumber,
        semester,
        coursecode: {
          [Op.notIn]: coursecodesWithMarks,
        },
      },
    });
    // console.log("subjectsWithoutMarks",subjectsWithoutMarks.map((mark)=>mark));

    res.json(subjectsWithoutMarks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to fetch subjects" });
  }
};

const viewResult = async (req, res) => {
  const { rollNumber, dob, semester } = req.body;

  try {
    const results = await marksModel.findAll({
      where: {
        rollNumber: rollNumber,
        semester: semester,
      },
      include: {
        model: student,
        attributes: [
          "firstName",
          "lastName",
          "dob",
          "address",
          "qualification",
          "degree",
          "department",
        ],
      },
      // include:{
      //   model: subject,
      //   attributes: ['subjectname']
      // }
    });

    if (results.length > 0) {
      const student = results[0].student;
      const responseData = {
        student: {
          firstName: student.firstName,
          lastName: student.lastName,
          degree: student.degree,
          department: student.department,
        },
        rollNumber: rollNumber,
        results: results.map((result) => ({
          semester: result.semester,
          coursecode: result.coursecode,
          // Subject: result.subject.subjectname,
          mark: result.mark,
        })),
      };

      res.json(responseData);
    } else {
      res.json({ message: "No results found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "error fetching data" });
  }
};

const findMarks = async (req, res) => {
  console.log(req.body);

  const { rollNumber, semester } = req.body;
  const userMarks = await marksModel.findAll({
    where: { rollNumber, semester },
  });
  res.json(userMarks);
};

const updateMarks = async (req, res) => {
  const { marks } = req.body;
  const { rollNumber, semester } = req.params;
  console.log(req.params);
  try {
    for (const markData of marks) {
      const { coursecode, mark } = markData;

      await marksModel.update(
        { mark },
        {
          where: { rollNumber, semester, coursecode },
        }
      );
    }

    res.status(201).json({
      message: "Marks Updated successfully",
      status: "success",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Unable to Update marks",
      status: "error",
    });
  }
};

const getAllMarks = async (req, res) => {
  const { rollNumber } = req.params;
  // console.log("req.body", req.params);

  try {
    const allMarks = await marksModel.findAll({
      where: { rollNumber },
    });
    res.json(allMarks);
  } catch (err) {
    console.log(err);
  }
};
const deleteMarks = async (req, res) => {
  const { rollNumber } = req.params;
  console.log("req.body:", req.body);
  console.log("req.params:", req.params);

  const toDelete = req.body;

  try {
    for (const item in toDelete) {
      const { semester, coursecode, mark } = toDelete[item];
      await marksModel.destroy({
        where: { rollNumber, semester, coursecode, mark },
      });
    }
    res.status(201).json({
      message: "Marks deleted successfully..",
      status: "success",
    });
  } catch (err) {
    console.error("Error deleteing marks", err);
    res.status(500).json({
      message: "Unable to delete marks",
      status: "error",
    });
  }
};

const viewMarks = async (req, res) => {
  console.log(req?.params);
  const { rollNumber } = req.params;
  try {
    const mark = await marks.findAll({
      where: {
        rollNumber,
      },
    });
    res.status(201).json(mark);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  addMarks,
  viewResult,
  addSubject,
  viewSubject,
  findMarks,
  updateMarks,
  getAllMarks,
  deleteMarks,
  viewMarks,
};
