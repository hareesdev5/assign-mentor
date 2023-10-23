const mentorModel = require('../models/Mentor')
const studentModel = require('../models/Student')


const getStudent = async (req,res)=>{
    try {
        let student = await studentModel.find()
        res.status(200).send({
            message:'Student Data Fetched Successfully',
            student
        })
    } catch (error) {
        res.status(500).send({
            message:'Internal Server Error',
            error:error.message
        })
    }
}


const Create = async (req, res) => {
    try {
      let student = await studentModel.findOne({email:req.body.email});
      if(!student){
          await studentModel.create(req.body)
          res.status(201).send({
           message: "Student Created Sucessfully",
      })
  }
  else{
      res.status(400).send({message:`Student with ${req.body.email} Already Exists`})
  }
    } catch (error) {
      res.status(400).send({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };
  


  const changeStudentMentor = async (req, res) => {
    try {
      let student = await studentModel.findOne({ _id: req.params.id });
      if (
        student.currentMentor !== null &&
        student.currentMentor !== "" &&
        student.currentMentor !== undefined
      ) {
        if (student.currentMentor === req.body.mentor_id) 
        {
          return res.status(201).send({
            message: "current and new mentor is same person!..",
          });
        }

        const CMentor = student.currentMentor;
        student.currentMentor = req.body.mentor_id;
        student.previousMentor = CMentor;

        const updateMentor = await studentModel.updateOne(
          { _id: req.params.id },
          { $set : { ...student } }
        );
  

        const previousMent = await mentorModel.findOne({
          _id: student.previousMentor,
        });
        if (previousMent && previousMent.studentList.length > 0) {
          const stuList = previousMent.studentList.filter(
            (sid) => sid !== req.params.id
          );
          previousMent.studentList = stuList;
          }
  
        res
          .status(201)
          .send({ message: "Student mentor has been changed successfully" });
      } else {
        student.currentMentor = req.body.mentor_id;
        const updatedStuMentor = await studentModel.updateOne(
          { _id: req.params.id },
          { $set :{ ...student } }
        );
        const updatedStudList = await mentorModel.updateOne(
          { _id: req.body.mentor_id },
          { $setOnInsert:{ studentList:req.params.id } },
          { upsert:true }
        );
        console.log(updatedStudList);
      }
    } catch (error) {
      res.status(400).send({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };


  const showPreviousMentor = async (req, res) => {
    try {
      let student = await studentModel.findOne({ _id:req.params.id });
      if (student?.previousMentor) 
      {
        const previousMent = await mentorModel.findOne({
          _id:student.previousMentor,
        });
        res.status(200).send({
          message: "Previous mentor Details",
          previousMent,
        });
      } else {
        res.status(200).send({
          message: "There is no Previous mentor for this student",
        });
      }
    } catch (error) {
      res.status(400).send({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };


  module.exports = {
    getStudent,
    Create,
    changeStudentMentor,
    showPreviousMentor
  }