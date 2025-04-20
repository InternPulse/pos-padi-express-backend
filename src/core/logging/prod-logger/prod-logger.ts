import pino from "pino"

const prodLogger = pino({
  level: process.env.LOG_LEVEL || "debug",
  timestamp: pino.stdTimeFunctions.isoTime, // ISO timestamps for consistency
})

export default prodLogger
