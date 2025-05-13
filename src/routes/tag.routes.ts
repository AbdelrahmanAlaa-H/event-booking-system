import express from "express";
import {
  createTag,
  getAllTags,
  deleteTag,
} from "../controllers/tag.controller";
import authMiddleware from "../middlewares/authMiddleware";
import adminMiddleware from "../middlewares/adminMiddleware";

const router = express.Router();

/**
 * @swagger
 * /api/tags:
 *   post:
 *     summary: Create a new tag
 *     description: Creates a new tag (Admin only)
 *     responses:
 *       201:
 *         description: Tag successfully created
 */
router.post("/", authMiddleware, adminMiddleware, createTag);

/**
 * @swagger
 * /api/tags:
 *   get:
 *     summary: Get all tags
 *     description: Fetches a list of all tags
 *     responses:
 *       200:
 *         description: List of tags
 */
router.get("/", getAllTags);

/**
 * @swagger
 * /api/tags/{id}:
 *   delete:
 *     summary: Delete a tag
 *     description: Deletes a tag by its ID (Admin only)
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Tag ID to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tag successfully deleted
 */
router.delete("/:id", authMiddleware, adminMiddleware, deleteTag);

export default router;
