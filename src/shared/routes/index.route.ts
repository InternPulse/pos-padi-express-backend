/* eslint-disable @typescript-eslint/no-unused-vars */
import { Application } from "express"
import logger from "../../core/logging/logger"
import { notificationRoutes } from "../../modules/notification/routes/notification.routes"

export default function createAppRoutes(app: Application) {
  try {
    // Step: 1 - Import Routes
    // example: imported routes
    // terminalRoutes
    // notificationsRoutes
    // agentsRoutes

    // Step: 2 - Pass "app" to routes
    // Implementation: pass app to routes
    // terminalRoutes(app)
    notificationRoutes(app)

    logger.info("Application Routes Created")
  } catch (e: any) {
    logger.error(e, "App Routes Error")
    process.exit(1)
  }
}
