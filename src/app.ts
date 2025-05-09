import dotenv from "dotenv"
import "reflect-metadata"
import express from "express"
import helmet from "helmet"
import cors from "cors"
import rateLimiter from "./shared/middleware/security/ratelimiter"
import requestLogger from "./shared/middleware/logging/request-logger"
import errorHandler from "./shared/middleware/errors/error-handler"
import verifyJWT from "./shared/middleware/security/authorization"
import setupSwagger from "./shared/utils/swagger"
// eslint-disable-next-line import/no-named-as-default
import notificationRoutes from "./modules/notification/routes/notification.routes"
import transactionRoutes from "./modules/transaction/routes/transaction.routes"
import disputesRoutes from "./modules/disputes/routes/disputes.routes"
import { ReqUser } from "./shared/types"

declare global {
  namespace Express {
    interface Request {
      user: ReqUser
    }
  }
}

dotenv.config()

const app = express()

// Security Middleware
app.use(helmet())
app.use(rateLimiter)
app.use(cors())

setupSwagger(app)

// Logging Middleware
app.use(requestLogger)

// Core Middleware
app.use(express.json())

// Authorization Middleware
app.use(verifyJWT)

// Routes
notificationRoutes(app)
transactionRoutes(app)
disputesRoutes(app)

// 404 Middleware
app.use((req, res) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`
  console.log("Route not found: ", fullUrl)

  res.status(404).json({ success: false, message: "Resource not found" })
})

// Error Handler
app.use(errorHandler)

// WebSocket Init
// initWebSocket(server)

// Start Server
// server.listen(PORT, () => {
//   logger.info(`Server running on port ${PORT}`)
// })

export default app
