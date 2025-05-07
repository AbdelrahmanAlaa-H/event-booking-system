import { Request, Response, NextFunction } from "express";
import Event from "../models/Event";

// دالة إضافة حدث (Create Event)
import { AuthenticatedRequest } from "../middlewares/authMiddleware";

export const createEvent = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { title, description, date, location } = req.body;

  try {
    const newEvent = new Event({
      title,
      description,
      date,
      location,
      createdBy: req.user?.id, // نستخدم الـ id من التوكن
    });

    await newEvent.save();

    res
      .status(201)
      .json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    next(error);
  }
};

// دالة الحصول على قائمة الأحداث (Get Events)
export const getEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

// دالة الحصول على تفاصيل حدث (Get Event by ID)
export const getEventById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);
    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }
    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};

// دالة تحديث حدث (Update Event)
export const updateEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  const { title, description, date, location } = req.body;
  try {
    const event = await Event.findById(id);
    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }

    // تحديث الحقول
    event.title = title || event.title;
    event.description = description || event.description;
    event.date = date || event.date;
    event.location = location || event.location;

    await event.save();
    res.status(200).json({ message: "Event updated successfully", event });
  } catch (error) {
    next(error);
  }
};

// دالة حذف حدث (Delete Event)
export const deleteEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);
    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }

    await event.deleteOne();
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    next(error);
  }
};
