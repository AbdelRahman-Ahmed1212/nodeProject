const {body , param , query} = require('express-validator');
const mongoose = require('mongoose');

exports.insertValidations = [
    body("fullname")
        .isString().withMessage("Name should be a string")
        .isAlpha("en-US", { ignore: ' ' }).withMessage("Name should be written in English with no numbers or special characters")
        .isLength({ min: 3 }).withMessage("Name should be at least 3 letters long"),

    body('supervisor').optional()
        .custom((value, { req }) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Supervisor must be a valid ObjectId');
            }
            return true;
        })
];

exports.updateValidations = [
    body('_id')
        .isString().withMessage("Id should be a string")
        .isLength({ min: 4 }).withMessage("Id should be at least 4 characters long"),

    body("fullname").optional()
        .isString().withMessage("Name should be a string")
        .isAlpha("en-US", { ignore: ' ' }).withMessage("Name should be written in English with no numbers or special characters")
        .isLength({ min: 3 }).withMessage("Name should be at least 3 letters long"),

    body('supervisor').optional()
        .custom((value, { req }) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Supervisor must be a valid ObjectId');
            }
            return true;
        })
];

exports.deleteValidations = [
    body('_id')
        .isString().withMessage("Id should be a string")
        .isLength({ min: 4 }).withMessage("Id should be at least 4 characters long")
];

