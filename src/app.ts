import dotenv from "dotenv"
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
import verifyJWT from "./shared/middleware/security/authorization"
import { initWebSocket } from "./core/websocket"
import setupSwagger from "./shared/utils/swagger"

declare global {
  namespace Express {
    interface Request {
      user: any
    }
  }
}

dotenv.config()

const app = express()
const server = http.createServer(app)
const PORT = process.env.PORT || 5000

async function startServer() {
  try {
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

    setupSwagger(app)

    // Logging Middleware
    app.use(requestLogger)

    // Core Middleware
    app.use(express.json())

    // Authorization Middleware
    app.use(verifyJWT)

    // Routes
    await createAppRoutes(app)

    // 404 Middleware
    app.use((req, res) => {
      res.status(404).json({ success: false, message: "Resource not found" })
    })

    // Error Handler
    app.use(errorHandler)

    // WebSocket Init
    initWebSocket(server)

    // Start Server
    server.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`)
    })

    logger.info("Server setup completed")
  } catch (error) {
    logger.error("Failed to start server:", error)
    process.exit(1)
  }

  // Global Error Handlers
  process.on("uncaughtException", (err) => {
    logger.error(err, "Uncaught Exception")
    process.exit(1)
  })

  process.on("unhandledRejection", (reason, promise) => {
    logger.error("Unhandled Rejection at:", promise, "reason:", reason)
  })
}

startServer()

export default app
