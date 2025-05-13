import express from "express";
import { register, login } from "../controllers/auth.controller";

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Registers a new user in the system
 *     responses:
 *       201:
 *         description: User successfully created
 */
router.post("/register", register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     description: Logs in a user and returns a JWT
 *     responses:
 *       200:
 *         description: User logged in successfully
 */
router.post("/login", login);

export default router;
