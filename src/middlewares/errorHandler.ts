import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err);
  res.status(500).json({ message: "Something went wrong!" });
};

export default errorHandler;
