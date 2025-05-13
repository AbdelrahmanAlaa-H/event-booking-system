import express from "express";
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controller";
import authMiddleware from "../middlewares/authMiddleware";
import adminMiddleware from "../middlewares/adminMiddleware";
import { upload } from "../utils/cloudinary";

const router = express.Router();

/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Create a new event
 *     description: Creates a new event (Admin only)
 *     responses:
 *       201:
 *         description: Event successfully created
 */
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  createEvent
);

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Get all events
 *     description: Fetches a list of all events
 *     responses:
 *       200:
 *         description: List of events
 */
router.get("/", getEvents);

/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     summary: Get event by ID
 *     description: Fetches details of an event by its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Event ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event details
 */
router.get("/:id", getEventById);

/**
 * @swagger
 * /api/events/{id}:
 *   put:
 *     summary: Update an event
 *     description: Updates an event by its ID (Admin only)
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Event ID to update
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event successfully updated
 */
router.put("/:id", authMiddleware, adminMiddleware, updateEvent);

/**
 * @swagger
 * /api/events/{id}:
 *   delete:
 *     summary: Delete an event
 *     description: Deletes an event by its ID (Admin only)
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Event ID to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event successfully deleted
 */
router.delete("/:id", authMiddleware, adminMiddleware, deleteEvent);

export default router;
