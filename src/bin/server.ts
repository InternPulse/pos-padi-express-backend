import http from "http"
import app from "../app"
import logger from "../core/logging/logger"
import { normalizePort, onListening, onError } from "./utils/server.util"

// Initialize Server
const PORT = normalizePort(process.env.PORT || "5000")
const server = http.createServer(app)
server.on("listening", () => onListening(server))
server.on("error", onError)

async function startServer() {
  try {
    server.listen(PORT, "0.0.0.0")
    logger.info(`Server running on port ${PORT}`)
  } catch (e: any) {
    logger.error(e, "Error starting server")
    process.exit(1)
  }
}

// Global Error Handlers
process.on("uncaughtException", (err) => {
  logger.error(err, "Uncaught Exception")
  process.exit(1)
})

process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection at:", promise, "reason:", reason)
  process.exit(1)
})

startServer()
