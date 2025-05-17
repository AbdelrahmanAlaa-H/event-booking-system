import { Request, Response, NextFunction } from "express";
import Tag from "../models/Tag";

export const createTag = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ message: "Tag name is required" });
      return;
    }

    const tag = await Tag.create({ name });
    res.status(201).json({ message: "Tag created successfully", tag });
  } catch (error) {
    next(error);
  }
};

export const getAllTags = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const tags = await Tag.find();
    res.status(200).json(tags);
  } catch (error) {
    next(error);
  }
};

export const deleteTag = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const tag = await Tag.findByIdAndDelete(id);

    if (!tag) {
      res.status(404).json({ message: "Tag not found" });
      return;
    }

    res.status(200).json({ message: "Tag deleted successfully" });
  } catch (error) {
    next(error);
  }
};
