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
// Create
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  createEvent
);

//Get
router.get("/", getEvents);

// Get by ID
router.get("/:id", getEventById);

//Update
router.put("/:id", authMiddleware, adminMiddleware, updateEvent);

// Delete
router.delete("/:id", authMiddleware, adminMiddleware, deleteEvent);

export default router;
