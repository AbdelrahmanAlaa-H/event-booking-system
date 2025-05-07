import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
  role: string;
}

// تعريف الواجهة لـ AuthenticatedRequest لكي تحتوي على المستخدم
export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  // هنا التغيير هو أن الدالة لا تُرجع قيمة بعد الآن
  const authHeader = req.headers.authorization;

  // تحقق من وجود التوكن
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "No token provided" }); // هنا يتم إرسال الاستجابة مباشرة
    return; // إضافة return لضمان عدم متابعة الميديلوير بعد إرسال الاستجابة
  }

  const token = authHeader.split(" ")[1];

  try {
    // فك تشفير التوكن
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret"
    ) as JwtPayload;

    // تخزين بيانات المستخدم في req.user
    req.user = {
      id: decoded.userId,
      role: decoded.role,
    };

    next(); // تمرير التحكم للميديلوير التالي
  } catch (error) {
    res.status(401).json({ message: "Invalid token" }); // إذا حدث خطأ في فك التوكن
  }
};

export default authMiddleware;
