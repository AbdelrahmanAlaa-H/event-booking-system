import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/auth.routes";
import eventRoutes from "./routes/event.routes";
import errorHandler from "./middlewares/errorHandler";
import bookingRoutes from "./routes/booking.routes";
import categoryRoutes from "./routes/category.routes";
import tagRoutes from "./routes/tag.routes";
import { setupSwagger } from "./config/swagger";
import "./models/Category";
import "./models/Tag";
dotenv.config();

const app = express();

connectDB();

// 👇 CORS setup: specify your frontend's URL
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://event-booking-system-frontend.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setupSwagger(app);

app.get("/", (req, res) => {
  res.send("Event Booking System API is running!");
});

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/tags", tagRoutes);

app.use(errorHandler);

console.log("Connecting to MongoDB:", process.env.MONGO_URI);

export default app;
