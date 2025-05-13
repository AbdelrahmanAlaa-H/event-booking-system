import { Request, Response, NextFunction } from "express";

const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.user?.role !== "admin") {
    res
      .status(403)
      .json({ message: "Access denied. Only admins are allowed." });
    return;
  }

  next();
};

export default adminMiddleware;
