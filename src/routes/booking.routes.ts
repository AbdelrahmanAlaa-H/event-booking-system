// routes/booking.routes.ts
import express from "express";
import { bookEvent, getMyBookings } from "../controllers/booking.controller";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

//Booking an event
router.post("/:eventId", authMiddleware, bookEvent);

// Get my bookings
router.get("/me", authMiddleware, getMyBookings);

export default router;
