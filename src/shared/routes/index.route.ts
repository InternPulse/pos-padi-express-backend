/* eslint-disable @typescript-eslint/no-unused-vars */
import { Application } from "express"
import logger from "../../core/logging/logger"
import { notificationRoutes } from "../../modules/notification/routes/notification.routes"

export default async function createAppRoutes(app: Application) {
  try {
    // Step: 1 - Import Routes
    // example: imported routes
    // terminalRoutes
    // notificationsRoutes
    // agentsRoutes
    const { default: transactionRoutes } = await import(
      "../../modules/transaction/routes/transaction.routes"
    )

    const { default: disputesRoutes } = await import(
      "../../modules/disputes/routes/disputes.routes"
    )
    // Step: 2 - Pass "app" to routes
    // Implementation: pass app to routes
    // terminalRoutes(app)
    notificationRoutes(app)
    transactionRoutes(app)
    disputesRoutes(app)

    logger.info("Application Routes Created")
  } catch (e: any) {
    logger.error(e, "App Routes Error")
    process.exit(1)
  }
}
