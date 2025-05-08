import express from "express";
import {
  createTag,
  getAllTags,
  deleteTag,
} from "../controllers/tag.controller";
import authMiddleware from "../middlewares/authMiddleware";
import adminMiddleware from "../middlewares/adminMiddleware";

const router = express.Router();

router.post("/", authMiddleware, adminMiddleware, createTag);
router.get("/", getAllTags);
router.delete("/:id", authMiddleware, adminMiddleware, deleteTag);

export default router;
