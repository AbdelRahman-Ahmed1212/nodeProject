const express = require('express');
const authController = require('../controllers/Authentication');

const router = express.Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Endpoint to log in a user
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: User login credentials
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *               description: User username or email
 *               example: user123
 *             password:
 *               type: string
 *               description: User password
 *               example: password123
 *     responses:
 *       200:
 *         description: Successful login
 *       400:
 *         description: Invalid input or credentials
 *       500:
 *         description: Internal server error
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /Register:
 *   post:
 *     summary: User registration
 *     description: Endpoint to register a new user
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User registration data
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             fullname:
 *               type: string
 *               description: User full name
 *               example: John Doe
 *             email:
 *               type: string
 *               description: User email address
 *               example: john.doe@example.com
 *             password:
 *               type: string
 *               description: User password
 *               example: password123
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Invalid input or missing required fields
 *       500:
 *         description: Internal server error
 */
router.post('/Register', authController.Register);

module.exports = router;
