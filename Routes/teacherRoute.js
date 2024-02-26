const express = require('express');
const teacherController = require('../controllers/teacherController');
const { changepasswordValidations, insertValidations, updateValidations } = require('../MW/ValidatorsMW/TeacherValidations');
const validator = require('../MW/ValidatorsMW/Validator');
const { auth, isAdmin, isAdminOrisTeacher } = require('../MW/AuthorizationMW');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Teachers
 *   description: API for managing teachers
 */

/**
 * @swagger
 * /teachers:
 *   get:
 *     summary: Get all teachers
 *     tags: [Teachers]
 *     responses:
 *       200:
 *         description: Successfully retrieved teachers
 *   post:
 *     summary: Add a new teacher
 *     tags: [Teachers]
 *     requestBody:
 *       description: Teacher object to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Teacher'
 *     responses:
 *       201:
 *         description: Teacher successfully added
 *   put:
 *     summary: Update a teacher
 *     tags: [Teachers]
 *     responses:
 *       200:
 *         description: Teacher successfully updated
 *   delete:
 *     summary: Delete a teacher
 *     tags: [Teachers]
 *     responses:
 *       200:
 *         description: Teacher successfully deleted
 *   getAllSupervisors:
 *     summary: Get all supervisors
 *     tags: [Teachers]
 *     responses:
 *       200:
 *         description: Successfully retrieved supervisors
 */

router.route('/teachers')
    .all(auth,isAdminOrisTeacher)
    .get(teacherController.getAllTeacher)
    .post(insertValidations, teacherController.addTeacher)
    .put(teacherController.updateTeacher)
    .delete(teacherController.deleteTeacher)
    .get(teacherController.getAllSupervisors);

/**
 * @swagger
 * /teachers/{id}:
 *   get:
 *     summary: Get teacher by ID
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the teacher to get
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the teacher
 *       404:
 *         description: Teacher not found
 */

router.route('/teachers/:id')
    .get(auth,isAdmin,teacherController.getTeacherById);

/**
 * @swagger
 * /teachers/supervisors:
 *   get:
 *     summary: Get all supervisors
 *     tags: [Teachers]
 *     responses:
 *       200:
 *         description: Successfully retrieved supervisors
 */
router.route('/teachers/supervisors')
    .get(auth,isAdmin,teacherController.getAllSupervisors);

module.exports = router;
