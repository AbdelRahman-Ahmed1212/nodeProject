const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const schema = new mongoose.Schema({
    _id: Number,
    fullName: String,
    age: Number,
    level: {
        type: String,
        enum: ['PreKG', 'KG1', 'KG2']
    },
    address: {
        city: String,
        street: String,
        building: String
    },
    image:String,

});
schema.plugin(AutoIncrement);



module.exports=mongoose.model("childern",schema);