import express, { Application } from "express"
import NotificationController from "../controllers/notification.controller"
import { NotificationService } from "../services/notification.service"
import NotificationRepo from "../repo/notification.repo"

const notificationRepo = new NotificationRepo()
const notificationService = new NotificationService(notificationRepo)
const notificationController = new NotificationController(notificationService)

export function notificationRoutes(app: Application) {
  const router = express.Router()

  router.post(
    "/",
    notificationController.createNotification.bind(notificationController),
  )

  router.get(
    "/:id",
    notificationController.getNotification.bind(notificationController),
  )

  router.get(
    "/",
    notificationController.getNotifications.bind(notificationController),
  )

  router.patch(
    "/:id/read",
    notificationController.markNotificationAsRead.bind(notificationController),
  )

  app.use("/api/v1/notifications", router)
}

export default notificationRoutes
