const {body , param , query} = require('express-validator');


exports.insertValidations = [
    body("fullname")
        .isString().withMessage("Name should be a string")
        .isAlpha("en-US", { ignore: ' ' }).withMessage("Name should be written in English with no numbers or special characters")
        .isLength({min:3}).withMessage("Name should be at least 3 letters long"),
    body('password')
        .isStrongPassword().withMessage("Password should be at least 8 characters with a mix of upper and lower case letters, numbers, and special characters"),
    body('email')
        .isEmail().withMessage("Should be a valid email")
];

exports.updateValidations = [
    body("fullname").optional()
        .isString().withMessage("Name should be a string")
        .isAlpha("en-US", { ignore: ' ' }).withMessage("Name should be written in English with no numbers or special characters")
        .isLength({min:3}).withMessage("Name should be at least 3 letters long"),
    body('password').optional()
        .isStrongPassword().withMessage("Password should be at least 8 characters with a mix of upper and lower case letters, numbers, and special characters"),
    body('email').optional()
        .isEmail().withMessage("Should be a valid email")
];

exports.changepasswordValidations = [
    body('password')
        .isStrongPassword().withMessage("Password should be at least 8 characters with a mix of upper and lower case letters, numbers, and special characters")
];
