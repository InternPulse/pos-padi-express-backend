// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from "express"
import ApiError from "../../utils/ApiError"
import logger from "../../../core/logging/logger"

const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  logger.error(err)
  console.log(err)
  const statusCode = err.statusCode || 500
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  })
}

export default errorHandler
