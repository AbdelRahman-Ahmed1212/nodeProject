const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const teacher=require("../models/teacherSchema")



module.exports.Register = async function(req, res, next) {
    try {
        const { fullname, email, image, password } = req.body;
        console.log(password);
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newTeacher = new teacher({
            _id: new mongoose.Types.ObjectId(),
            fullname,
            email,
            image,
            password: hashedPassword,
        });    
        const savedObject = await newTeacher.save();
        res.json(savedObject);
    } catch (error) {
        console.error('Error in Register:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports.login = function(req, res, next) {
    if (req.body.userName == 'Admin') {
        token = jwt.sign({ userName: req.body.userName, role: 'Admin' }, process.env.JWT_SECRET);
        res.json({ Token: token });
    } else {
        console.log(req.body);
        teacher.findOne({ userName: req.body.userName })
            .then((data) => {
                console.log(data);
                if (data == null) {
                    next(new Error("User does not exist"));
                }else {
                    if(req.body.password){
                        bcrypt.compare(req.body.password,data.password)
                        token = jwt.sign({ userName: data.userName, role: 'Teacher' }, process.env.JWT_SECRET);
                        res.json({ Token: token });
                    }
                   
                }
            })
            .catch((error) => {
                next(error);
            });
    }
};
