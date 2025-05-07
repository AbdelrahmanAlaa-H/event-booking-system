import { Request, Response, NextFunction } from "express";

// ميدل وير للتحقق من أن المستخدم هو "admin"
const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.user?.role !== "admin") {
    // إرجاع رد HTTP 403 في حالة عدم وجود صلاحية
    res
      .status(403)
      .json({ message: "Access denied. Only admins are allowed." });
    return; // هنا نوقف العملية بعد إرسال الاستجابة
  }
  // إذا كان المستخدم Admin، يسمح بالاستمرار
  next(); // استدعاء next() إذا كانت الصلاحية صحيحة
};

export default adminMiddleware;
