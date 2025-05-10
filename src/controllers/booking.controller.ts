// controllers/booking.controller.ts
import { Request, Response, NextFunction } from "express";
import Booking from "../models/Booking";
import Event from "../models/Event";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";

export const bookEvent = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { eventId } = req.params;
  const userId = req.user?.id;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }

    const booking = await Booking.create({ user: userId, event: eventId });

    res.status(201).json({ message: "Event booked successfully", booking });
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(400).json({ message: "You already booked this event" });
    } else {
      next(error);
    }
  }
};

export const getMyBookings = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.id;

  try {
    const bookings = await Booking.find({ user: userId }).populate("event");
    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};
