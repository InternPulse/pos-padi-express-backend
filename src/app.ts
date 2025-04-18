import "reflect-metadata"
import express from "express"
import http from "http"
import helmet from "helmet"
import cors from "cors"
import rateLimiter from "./shared/middleware/security/ratelimiter"
import logger from "./core/logging/logger"
import requestLogger from "./shared/middleware/logging/request-logger"
import errorHandler from "./shared/middleware/errors/error-handler"
import createAppRoutes from "./shared/routes/index.route"
import {notificationRoutes} from "./modules/notification/routes/notification.routes"
import { initWebSocket } from "./core/websocket"

const app = express()
const server = http.createServer(app)
const PORT = process.env.PORT || 3000

async function startServer() {
  try {
    // Wait for the database connection to complete
    // await connectDatabase()

    // Security Middleware
    app.use(helmet())
    app.use(rateLimiter)
    app.use(
      cors({
        origin: "*", // For Development
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
      }),
    )

    // logging
    app.use(requestLogger)

    // core middlewares
    app.use(express.json())

    // routes
    app.use("/notifications", notificationRoutes)
    createAppRoutes(app)

    // 404 Middleware
    app.use((req, res) => {
      res.status(404).json({ success: false, message: "Resource not found" })
    })

    // error
    app.use(errorHandler)

    // We have to initialize WebSocket server with the HTTP server, not the Express app
    initWebSocket(server)

    // Start the HTTP server
    server.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`)
    })

    logger.info("Server setup completed")
  } catch (error) {
    logger.error("Failed to start server:", error)
    process.exit(1)
  }

  // Global error handlers
  process.on("uncaughtException", (err) => {
    logger.error(err, "Uncaught Exception")
    process.exit(1)
  })

  process.on("unhandledRejection", (reason, promise) => {
    logger.error("Unhandled Rejection at:", promise, "reason:", reason)
  })
}

startServer() // Call the async function to start the server

export default app
