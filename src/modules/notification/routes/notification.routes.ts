import express, { Application } from "express"
import NotificationController from "../controllers/notification.controller"
import { NotificationService } from "../services/notification.service"
import NotificationRepo from "../repo/notification.repo"
import validateRequest from "../../../shared/middleware/validation/request"
import {
  createNotificationValidationSchema,
  getNotificationsValidationSchema,
  getNotificationValidationSchema,
  markNotificationAsReadValidationSchema,
} from "../validators/notification.schema"

const notificationRepo = new NotificationRepo()
const notificationService = new NotificationService(notificationRepo)
const notificationController = new NotificationController(notificationService)

export function notificationRoutes(app: Application) {
  const router = express.Router()

  router.post(
    "/",
    validateRequest(createNotificationValidationSchema, "body"),
    notificationController.createNotification.bind(notificationController),
  )

  router.get(
    "/:id",
    validateRequest(getNotificationValidationSchema, "params"),
    notificationController.getNotification.bind(notificationController),
  )

  router.get(
    "/",
    validateRequest(getNotificationsValidationSchema, "query"),
    notificationController.getNotifications.bind(notificationController),
  )

  router.patch(
    "/:id/read",
    validateRequest(markNotificationAsReadValidationSchema, "params"),
    notificationController.markNotificationAsRead.bind(notificationController),
  )

  app.use("/api/v1/notifications", router)
}

export default notificationRoutes
