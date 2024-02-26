const express=require("express")
const mongoose = require('mongoose');

const TeacherModel=require("../models/teacherSchema")
module.exports.getAllTeacher = (req, res, next) => {
    TeacherModel.find({})
        .then(teachers => {
            res.json(teachers);
        })
        .catch(error => {
            next(error);
        });
};
module.exports.getTeacherById = (req, res, next) => {

 

    TeacherModel.findById({_id:req.params.id})
        .then(teacher => {
            if (!teacher) {
                return res.status(404).json({ message: 'Teacher not found' });
            }

            res.json(teacher);
        })
        .catch(error => {
            next(error);
        });
};
module.exports.addTeacher = (req, res, next) => {
    const { fullname, email, image, password } = req.body;

    const newTeacher = new TeacherModel({
        _id: new mongoose.Types.ObjectId(),
        fullname,
        email,
        image,
        password,
    });

    newTeacher.save()
        .then(savedTeacher => {
            res.status(201).json(savedTeacher);
        })
        .catch(error => {
            next(error);
        });
};

module.exports.updateTeacher = (req, res, next) => {
    const updateData = req.body;
    const teacherId = req.body.id;
    TeacherModel.findByIdAndUpdate(teacherId, updateData, { new: true })
        .then(updatedTeacher => {
            if (!updatedTeacher) {
                return res.status(404).json({ message: 'Teacher not found' });
            }

            res.json(updatedTeacher);
        })
        .catch(error => {
            next(error);
        });
};
module.exports.deleteTeacher = (req, res, next) => {
    const teacherId = req.body.id;

    TeacherModel.findByIdAndDelete(teacherId)
        .then(deletedTeacher => {
            if (!deletedTeacher) {
                return res.status(404).json({ message: 'Teacher not found' });
            }

            res.json({ message: 'Teacher deleted successfully' });
        })
        .catch(error => {
            next(error);
        });
};

module.exports.getAllSupervisors = (req, res, next) => {
    ClassModel.distinct('Supervisor')
        .then(supervisors => {
            res.json(supervisors);
        })
        .catch(error => {
            next(error);
        });
};
