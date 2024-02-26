const {body , param , query} = require('express-validator');

exports.insertValidations = [
    body('fullname').isString().withMessage("name should be string").isAlpha("en-US", { ignore: ' ' }).withMessage(" No Numbers or Special Characters is allowed").isLength({min:3}).withMessage("name should be 3 letter long at least"),
    body('age').isInt({min:4, max:10}).withMessage("age should be between 4 and 10 years")
]



exports.updateValidations = [
    body('_id').isString().withMessage("Id should be a string").isLength({min:4}).withMessage("id should be one letter long at least"),
    body('fullname').optional().isString().withMessage("name should be string").isAlpha("en-US", { ignore: ' ' }).withMessage("Name Should Be Written In English ").isLength({min:3}).withMessage("name should be 3 letter long at least"),
    body('age').optional().isInt({min:3, max:7}).withMessage("age should be between 3 and 7 years")
]

exports.deleteValidations=[
    body('_id').isString().withMessage("Id should be a string").isLength({min:4}).withMessage("name should be one letter long at least")
]