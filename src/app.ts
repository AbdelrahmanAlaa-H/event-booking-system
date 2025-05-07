import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/auth.routes";
import eventRoutes from "./routes/event.routes";
import errorHandler from "./middlewares/errorHandler";
import bookingRoutes from "./routes/booking.routes";

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);

app.use(errorHandler);

export default app;
