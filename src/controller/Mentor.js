const { set } = require('mongoose')
const mentorModel = require('../models/Mentor')
const studentModel = require('../models/Student')

const getMentor = async (req,res)=>{
    try {
        let mentor = await mentorModel.find()
        res.status(200).send({
            message:'Data fetched Successfully',
            mentor
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:'Internal Server Error',
            error:error.message
        })
    }
}

const createMentor = async (req,res)=>{
    try {
        let mentor = await mentorModel.findOne({email:req.body.email})
        if(!mentor){
            await mentorModel.create(req.body)
            res.status(201).send({
                message:'Mentor Created Successfully'
            })
        }
        else{
            res.status(400).send({
                message:`Mentor with ${req.body.email} already exists`
            })
        }
    } catch (error) {
        res.status(500).send({
            message:'Internal Server Error',
            error:error.message
        })
    }
}

const assignStudent = async (req,res)=>{
    try {
        let mentor = await mentorModel.findOne({_id: req.params.id})
        if(mentor){
            let totalStudents = mentor.studentList.concat(req.body.studentList)
            mentor.studentList = [...new set(totalStudents)]
            let idCriteria = {
                _id: {$in:mentor.studentList}
            }
            const selectedStudentList = await studentModel.find(idCriteria)
            const studentHaveMentorList = selectedStudentList.filter(
                (student)=>
                student.currentMentor !== null &&
                student.currentMentor !== undefined &&
                student.currentMentor !== '' && 
                student.currentMentor !== req.params.id
            )
            if(studentHaveMentorList.length === 0){
                const updatedMentor = await mentorModel.updateOne(
                    idCriteria,
                    {currentMentor: req.params.id},
                    {multi:true}
                )
                res.status(201).send({
                    message:'Some student already assigned to mentor. Please check and try again'
                })
            }
        }
        else{
            res.status(201).send({
                message:'Invalid mentor Id'
            })
        }
    } catch (error) {
        res.status(500).send({
            message:'Internal Server Error',
            error:error.message
        })
    }
}

const showStudentList = async (req,res)=>{
    try {
        const mentor = await mentorModel.findOne({_id: req.params.id})
        let idCriteria = {
            _id:{$in:mentor.studentList}
        }
        const studentDetails = await studentModel.find(idCriteria)

        res.status(201).send({
            message:'Internal Server Error',
            error:error.message
        })
    } catch (error) {
        
    }
}



module.exports = {
    getMentor,
    createMentor,
    assignStudent,
    showStudentList
}
