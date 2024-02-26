const express=require("express");
const childernController=require("../controllers/childernController")
const {deleteValidations,updateValidations,insertValidations} = require('../MW/ValidatorsMW/ChildValidations')
const validator = require('../MW/ValidatorsMW/Validator');
const { isAdminOrisTeacher, auth } = require("../MW/AuthorizationMW");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Children
 *   description: API endpoints for managing children
 */

/**
 * @swagger
 * /child:
 *   get:
 *     summary: Get all children
 *     tags: [Children]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully retrieved children
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '500':
 *         description: Internal Server Error
 *   post:
 *     summary: Add a new child
 *     tags: [Children]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               age:
 *                 type: number
 *               level:
 *                 type: string
 *               address:
 *                 type: string
 *               image:
 *                 type: string
 *             required:
 *               - fullName
 *               - age
 *               - level
 *               - address
 *               - image
 *     responses:
 *       '201':
 *         description: Child created successfully
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '500':
 *         description: Internal Server Error
 *   put:
 *     summary: Update a child
 *     tags: [Children]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               age:
 *                 type: number
 *               level:
 *                 type: string
 *               address:
 *                 type: string
 *               image:
 *                 type: string
 *             required:
 *               - fullName
 *               - age
 *               - level
 *               - address
 *               - image
 *     responses:
 *       '200':
 *         description: Child updated successfully
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Child not found
 *       '500':
 *         description: Internal Server Error
 *   delete:
 *     summary: Delete a child
 *     tags: [Children]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *             required:
 *               - id
 *     responses:
 *       '200':
 *         description: Child deleted successfully
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Child not found
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /child/{id}:
 *   get:
 *     summary: Get a child by ID
 *     tags: [Children]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Child ID
 *     responses:
 *       '200':
 *         description: Successfully retrieved child by ID
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Child not found
 *       '500':
 *         description: Internal Server Error
 */

router.route('/child')
  .all(auth,isAdminOrisTeacher )
  .get(childernController.getAllChildren)
  .post(insertValidations, validator, childernController.addChild)
  .put(updateValidations, validator, childernController.updateChild)
  .delete(deleteValidations, validator, childernController.deleteChild);

router.get('/child/:id', auth, isAdminOrisTeacher, childernController.getChildById);

module.exports = router;
