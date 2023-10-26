const express=require("express")
const router = express.Router();
const verifyToken = require("../middleware/auth")
const userController = require("../controller/userController");


router.get('/verify',verifyToken, userController.getUser)


router.post('/register',userController.Register)

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: User password
 *                 example: password123
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User logged in successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 60f6d4c8e1b8d80015c7d4c8
 *                     email:
 *                       type: string
 *                       example: user@example.com
 *                     nameAccount:
 *                       type: string
 *                       example: John Doe
 *                     phone:
 *                       type: string
 *                       example: 123456789
 *                     role:
 *                       type: string
 *                       example: ADMIN
 *       
 */

router.post('/login',userController.Login);

module.exports =router