const express = require('express');
const classController = require('../controllers/classController');
const { auth, isAdmin } = require('../MW/AuthorizationMW');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Classes
 *   description: API for managing classes
 */

/**
 * @swagger
 * /class:
 *   get:
 *     summary: Get all classes
 *     tags: [Classes]
 *     security:
 *       - auth: []
 *       - isAdmin: []
 *     responses:
 *       200:
 *         description: Successfully retrieved classes
 *       401:
 *         description: Unauthorized
 *   post:
 *     summary: Add a new class
 *     tags: [Classes]
 *     security:
 *       - auth: []
 *       - isAdmin: []
 *     requestBody:
 *       description: Class object to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       201:
 *         description: Class successfully added
 *       401:
 *         description: Unauthorized
 */

router.route('/class')
    .all(auth, isAdmin)
    .get(classController.getAllClasses)
    .post(classController.addClass)
    .put(classController.updateClass)
    .delete(classController.deleteClass);

/**
 * @swagger
 * /class/{id}:
 *   get:
 *     summary: Get class by ID
 *     tags: [Classes]
 *     security:
 *       - isAdmin: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the class to get
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the class
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Class not found
 */

router.route('/class/:id')
    .get(auth,isAdmin, classController.getClassById);

module.exports = router;
