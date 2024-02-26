const mongoose=require("mongoose");
const bcrypt = require('bcrypt');
// _id(objectID), fullname,password, email , image (which is string)
const schema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    fullname:String, 
    email:String,
    image:String,
    password:String,
});

schema.pre('save', async function (next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
})
module.exports=mongoose.model("teacher",schema);