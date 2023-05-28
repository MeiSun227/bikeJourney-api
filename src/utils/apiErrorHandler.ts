import { Request, Response, NextFunction } from "express";
import ApiError from "./apiError";

export default function (
  error: ApiError,
  _req: Request,
  res: Response,
  next: NextFunction
){
  res.status(error.statusCode).json({
    status: "error",
    statusCode: error.statusCode,
    message: error.message,
  });
  next(error);
}
