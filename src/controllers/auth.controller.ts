import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

// دالة التسجيل (Register)
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // تشفير كلمة السر
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // حفظ المستخدم الجديد في قاعدة البيانات
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error); // تمرير الخطأ إلى Middleware الخاص بالخطأ
  }
};

// دالة الدخول (Login)
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    // مقارنة كلمة السر المدخلة مع المخزنة في قاعدة البيانات
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    // توليد JWT Token للمستخدم
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" } // صلاحية التوكن 1 يوم
    );

    res.json({ token });
  } catch (error) {
    next(error); // تمرير الخطأ إلى Middleware الخاص بالخطأ
  }
};
