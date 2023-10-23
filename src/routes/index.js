const express = require('express')
const route = express.Router()

const studentRoute = require('../routes/Student')
const mentorRoute = require('../routes/Mentor')

route.use('/student',studentRoute)
route.use('/mentor',mentorRoute)

module.exports = route