import devLogger from "./dev-logger/dev-logger"
import prodLogger from "./prod-logger/prod-logger"

const logger = process.env.NODE_ENV === "development" ? devLogger : prodLogger

export function getChildLogger(context: Record<string, any>) {
  return logger.child(context)
}

export default logger
