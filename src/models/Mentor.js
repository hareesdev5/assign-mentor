const mongoose = require('./index')
const mentorSchema = new mongoose.Schema({
    name:{type:String,require:[true,"name is required"]},
    email:{type:String,require:[true,"email is required"]},
    studentList:{type:Array}
})

const mentorModel = mongoose.model('mentors',mentorSchema)
module.exports = mentorModel