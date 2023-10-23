const express = require('express')
const router = express.Router()

const mentorController = require('../controller/Mentor')

router.get('/',mentorController.getMentor)
router.post('/create',mentorController.createMentor)
router.put('/:id',mentorController.assignStudent)
router.get('/showStudentList/:id',mentorController.showStudentList)

module.exports = router