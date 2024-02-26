const ClassModel = require('../models/classSchema');
const mongoose = require('mongoose')
module.exports.getAllClasses = (req, res, next) => {
    ClassModel.find({})
        .populate('Supervisor', 'fullName') 
        .populate('childern', 'fullName') 
        .then(classes => {
            res.json(classes);
        })
        .catch(error => {
            next(error);
        });
};
module.exports.getClassById = (req, res, next) => {
    const classId = req.params.id;

    ClassModel.findById(classId)
        .populate('Supervisor', 'fullname') 
        .populate('childern', 'fullName') 
        .exec()
        .then(foundClass => {
            if (!foundClass) {
                return res.status(404).json({ message: 'Class not found' });
            }

            res.json(foundClass);
        })
        .catch(error => {
            next(error);
        });
};

module.exports.addClass = (req, res, next) => {
    const { _id,name, Supervisor, children } = req.body;

    const newClass = new ClassModel({
        _id,
        name,
        Supervisor,
        children,
    });

    newClass.save()
        .then(savedClass => {
            res.status(201).json(savedClass);
        })
        .catch(error => {
            next(error);
        });
};
module.exports.updateClass = (req, res, next) => {
    const classId = req.body._id; 
    const updateData = req.body;

    ClassModel.findByIdAndUpdate(classId, updateData, { new: true })
        .then(updatedClass => {
            if (!updatedClass) {
                return res.status(404).json({ message: 'Class not found' });
            }

            res.json(updatedClass);
        })
        .catch(error => {
            next(error);
        });
};

module.exports.deleteClass = (req, res, next) => {
    const classId = req.body._id;

    ClassModel.findByIdAndDelete(classId)
        .then(deletedClass => {
            if (!deletedClass) {
                return res.status(404).json({ message: 'Class not found' });
            }

            res.json({ message: 'Class deleted successfully' });
        })
        .catch(error => {
            next(error);
        });
};

module.exports.getClassChildren = (req, res, next) => {
    const classId = req.params._id;

    ClassModel.findById(classId)
        .populate('childern', 'fullName age level address') 
        .then(foundClass => {
            if (!foundClass) {
                return res.status(404).json({ message: 'Class not found' });
            }

            res.json(foundClass.children);
        })
        .catch(error => {
            next(error);
        });
};
module.exports.getClassTeacher = (req, res, next) => {
    const classId = req.params._id;

    ClassModel.findById(classId)
        .populate('Supervisor', 'fullname email image') 
        .then(foundClass => {
            if (!foundClass) {
                return res.status(404).json({ message: 'Class not found' });
            }

            res.json(foundClass.Supervisor);
        })
        .catch(error => {
            next(error);
        });
};
