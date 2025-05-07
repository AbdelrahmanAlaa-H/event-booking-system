import express from "express";
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controller";
import authMiddleware from "../middlewares/authMiddleware";
import adminMiddleware from "../middlewares/adminMiddleware"; // استيراد adminMiddleware

const router = express.Router();

// إنشاء حدث - فقط الـ admin يقدر يعملها
router.post("/", authMiddleware, adminMiddleware, createEvent);

// الحصول على قائمة الأحداث
router.get("/", getEvents);

// الحصول على حدث باستخدام المعرف
router.get("/:id", getEventById);

// تحديث حدث - فقط الـ admin يقدر يعملها
router.put("/:id", authMiddleware, adminMiddleware, updateEvent);

// حذف حدث - فقط الـ admin يقدر يعملها
router.delete("/:id", authMiddleware, adminMiddleware, deleteEvent);

export default router;
