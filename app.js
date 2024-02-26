var express = require('express');
var mongoose = require('mongoose');
var teacherRouter = require('./Routes/teacherRoute');
var childernRouter = require('./Routes/childernRoute');
var classRouter = require('./Routes/classRoute')
var authRouter = require('./Routes/authRoute');
var fileUploaded = require('./MW/files');
const swagger = require('./swagger');
const cors = require('cors');
const { auth } = require('./MW/AuthorizationMW');
const dotenv = require('dotenv');
dotenv.config();
var app = express();
/////////////////////////////////
mongoose.connect('mongodb://127.0.0.1:27017/Nursery')
.then(()=>{
    console.log("DB connected .... ");
})
.catch((error)=>{
    console.log("DB connection Problem "+error);
})



// middlewares registering
app.use(cors())
app.use(express.json())
swagger(app,process.env.PORT)
app.use(authRouter)
app.use(teacherRouter)
app.use(childernRouter)
app.use(classRouter)
app.use((req,res)=>{
  res.status(404).json({
      message: "Not Found"
  })
})
app.post('/upload',fileUploaded.single("photos"),(req,res)=>{
  res.status(200).json({
      message: "File Uploaded"
  })
})
app.use((error,request,response,next)=>{

  response.status(error.status||500).json({message:error+""});
})
app.listen(process.env.PORT, function () {
  console.log('I am a live!');
});
