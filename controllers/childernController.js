const childModel=require("../models/childernSchema")
const mongoose = require('mongoose');
module.exports.getAllChildren = (req, res, next) => {
    childModel.find()
        .then((children) => {
            res.json(children);
        })
        .catch((error) => {
            next(error);
        });
}
module.exports.getChildById = async (req, res, next) => {
    try {
        const child = await childModel.findById(req.params.id);

        if (!child) {
            return res.status(404).json({ message: 'Child not found' });
        }

        res.json(child);
    } catch (error) {
        next(error);
    }
};
module.exports.addChild = async (req, res, next) => {
    try {
        const { fullName, age, level, address, image } = req.body;

        const newChild = new childModel({
            fullName,
            age,
            level,
            address,
            image,
        });

        const savedChild = await newChild.save();
        res.status(201).json(savedChild);
    } catch (error) {
        next(error);
    }
};
module.exports.updateChild = async (req, res, next) => {
    try {
        const childId = req.body.id; 
        const updateData = req.body;

        const updatedChild = await childModel.findByIdAndUpdate(childId, updateData, { new: true });

        if (!updatedChild) {
            return res.status(404).json({ message: 'Child not found' });
        }

        res.json(updatedChild);
    } catch (error) {
        next(error);
    }
};
module.exports.deleteChild = async (req, res, next) => {
    try {
        const { id } = req.body;

        const deletedChild = await childModel.findByIdAndDelete(id);

        if (!deletedChild) {
            const notFoundError = new Error('Child not found');
            notFoundError.status = 404;
            throw notFoundError;
        }

        res.json({ message: 'Child deleted successfully' });
    } catch (error) {
        next(error);
    }
};
