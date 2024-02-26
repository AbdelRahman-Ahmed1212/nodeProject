const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const classSchema = new mongoose.Schema({ 
 _id: Number,
 name:String,
 Supervisor:{
    type:Number,
    ref:'teacher'
 },
 childern:[{
    type:Number,
    ref:'childern'
 }],
})
module.exports = mongoose.model('class', classSchema);