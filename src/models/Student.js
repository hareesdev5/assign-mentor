const mongoose = require('./index')

const studentSchema = new mongoose.Schema({
    name:{type:String,required:[true,'name is required']},
    email:{type:String,required:[true,'email is required']},
    batch:{type:String,required:[true,'batch is required']},
    currentMentor:{type:String},
    previousMentor:{type:String}
})

const studentModel = mongoose.model('students',studentSchema)
module.exports = studentModel