import express from "express";
import {
  createCategory,
  getAllCategories,
  deleteCategory,
} from "../controllers/category.controller";
import authMiddleware from "../middlewares/authMiddleware";
import adminMiddleware from "../middlewares/adminMiddleware";

const router = express.Router();

router.post("/", authMiddleware, adminMiddleware, createCategory);
router.get("/", getAllCategories);
router.delete("/:id", authMiddleware, adminMiddleware, deleteCategory);

export default router;
