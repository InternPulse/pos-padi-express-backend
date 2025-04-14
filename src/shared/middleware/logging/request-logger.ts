import { Request, Response, NextFunction } from "express"
import { v4 as uuidv4 } from "uuid"
import pino from "pino"
import { getChildLogger } from "../../../core/logging/logger"

// Extend the Express Request interface to include our logger property.
declare global {
  namespace Express {
    interface Request {
      requestId?: string
      log?: pino.Logger
    }
  }
}

export default function requestLogger(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Get a request id from the header or generate a new one
  const requestId = (req.headers["x-request-id"] as string) || uuidv4()
  req.requestId = requestId
  // Create a child logger with the request id context
  req.log = getChildLogger({ requestId })

  req.log.info("Incoming request", { method: req.method, url: req.url })

  // Optionally, log when the response is finished.
  res.on("finish", () => {
    req.log?.info("Request completed", { statusCode: res.statusCode })
  })

  next()
}
