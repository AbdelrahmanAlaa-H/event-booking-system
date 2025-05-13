import express from "express";
import { bookEvent, getMyBookings } from "../controllers/booking.controller";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

/**
 * @swagger
 * /api/bookings/{eventId}:
 *   post:
 *     summary: Book an event
 *     description: Books a specific event for the logged-in user
 *     parameters:
 *       - name: eventId
 *         in: path
 *         description: Event ID to book
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event successfully booked
 */
router.post("/:eventId", authMiddleware, bookEvent);

/**
 * @swagger
 * /api/bookings/me:
 *   get:
 *     summary: Get user's bookings
 *     description: Fetches all bookings of the logged-in user
 *     responses:
 *       200:
 *         description: List of bookings
 */
router.get("/me", authMiddleware, getMyBookings);

export default router;
