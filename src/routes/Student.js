const express = require('express')
const router = express.Router()

const studentController = require('../controller/Student')


router.get('/',studentController.getStudent)
router.post('/create',studentController.Create)
router.put('/changeStudentMentor',studentController.changeStudentMentor)
router.get('/showPreviousMentor/:id',studentController.showPreviousMentor)


module.exports = router