import "reflect-metadata"
import express from "express"
import helmet from "helmet"
import cors from "cors"
import rateLimiter from "./shared/middleware/security/ratelimiter"
import logger from "./core/logging/logger"
import requestLogger from "./shared/middleware/logging/request-logger"
import errorHandler from "./shared/middleware/errors/error-handler"
import createAppRoutes from "./shared/routes/index.route"

const app = express()
const PORT = process.env.PORT || 5000

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
    createAppRoutes(app)

    // 404 Middleware
    app.use((req, res) => {
      res.status(404).json({ success: false, message: "Resource not found" })
    })

    // error
    app.use(errorHandler)

    process.on("uncaughtException", (err) => {
      logger.error(err, "Uncaught Exception")
      process.exit(1)
    })

    process.on("unhandledRejection", (reason, promise) => {
      console.log(reason)
      console.log(promise)
      logger.error("Unhandled Rejection at:", promise, "reason:", reason)
    })

    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`)
    })

    logger.info("Server setup completed") // confirmation log
  } catch (error) {
    logger.error("Failed to start server:", error)
    process.exit(1) // Exit if database connection or server start fails
  }
}

startServer() // Call the async function to start the server

export default app
