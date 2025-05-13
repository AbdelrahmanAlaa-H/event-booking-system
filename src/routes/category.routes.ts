import express from "express";
import {
  createCategory,
  getAllCategories,
  deleteCategory,
} from "../controllers/category.controller";
import authMiddleware from "../middlewares/authMiddleware";
import adminMiddleware from "../middlewares/adminMiddleware";

const router = express.Router();

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a new category
 *     description: Creates a new category (Admin only)
 *     responses:
 *       201:
 *         description: Category successfully created
 */
router.post("/", authMiddleware, adminMiddleware, createCategory);

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     description: Fetches all available categories
 *     responses:
 *       200:
 *         description: List of categories
 */
router.get("/", getAllCategories);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     description: Deletes a category by its ID (Admin only)
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Category ID to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category successfully deleted
 */
router.delete("/:id", authMiddleware, adminMiddleware, deleteCategory);

export default router;
