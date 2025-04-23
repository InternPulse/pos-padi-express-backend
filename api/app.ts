import dotenv from "dotenv"
import "reflect-metadata"
import express from "express"
import helmet from "helmet"
import cors from "cors"

import rateLimiter from "../src/shared/middleware/security/ratelimiter" // Update the path if the file exists elsewhere
import requestLogger from "../src/shared/middleware/logging/request-logger"
import errorHandler from "../src/shared/middleware/errors/error-handler"
// import verifyJWT from "./shared/middleware/security/authorization";
// import { initWebSocket } from "./core/websocket";
import setupSwagger from "../src/shared/utils/swagger"
// eslint-disable-next-line import/no-named-as-default
import notificationRoutes from "../src/modules/notification/routes/notification.routes"
import transactionRoutes from "../src/modules/transaction/routes/transaction.routes"
import disputesRoutes from "../src/modules/disputes/routes/disputes.routes"

dotenv.config()

declare global {
  namespace Express {
    interface Request {
      user: any
    }
  }
}

const app = express()

// Security Middleware
app.use(helmet())
app.use(rateLimiter)
app.use(
  cors({
    origin: "*", // Replace with allowed origins in prod
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
)

// Swagger docs
setupSwagger(app)

// Logging Middleware
app.use(requestLogger)

// Core Middleware
app.use(express.json())

// Authorization Middleware (Optional if not needed for all routes)
// app.use(verifyJWT);

// Routes
notificationRoutes(app)
transactionRoutes(app)
disputesRoutes(app)

// 404 Handler
app.use((req, res) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`
  console.log("Route not found: ", fullUrl)
  res.status(404).json({ success: false, message: "Resource not found" })
})

app.get("/", (req, res) => {
  res.json({ success: true, message: "API is live 🚀" })
})

// Error Handler
app.use(errorHandler)

// Export app for Vercel or other serverless hosting
export default app
