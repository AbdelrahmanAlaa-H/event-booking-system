// routes/booking.routes.ts
import express from "express";
import { bookEvent, getMyBookings } from "../controllers/booking.controller";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

// حجز حدث
router.post("/:eventId", authMiddleware, bookEvent);

// عرض الحجوزات الخاصة بالمستخدم
router.get("/me", authMiddleware, getMyBookings);

export default router;
