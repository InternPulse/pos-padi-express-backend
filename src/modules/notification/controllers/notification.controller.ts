import { Request, Response, NextFunction } from "express"
import { NotificationService } from "../services/notification.service"

export default class NotificationController {
  constructor(private notificationService: NotificationService) {}

  async createNotification(req: Request, res: Response, next: NextFunction) {
    try {
      const notification = await this.notificationService.createNotification(
        req.body,
      )
      res.status(201).json({
        message: "Notification created successfully",
        status: "success",
        data: notification,
      })
    } catch (e: any) {
      next(e)
    }
  }

  async getNotification(req: Request, res: Response, next: NextFunction) {
    try {
      const notificationId = req.params.id

      const notification = await this.notificationService.getNotificationById(
        notificationId,
        req.user,
      )
      res.status(201).json({
        message: "Notification fetched",
        status: "success",
        data: notification,
      })
    } catch (e: any) {
      next(e)
    }
  }

  async getNotifications(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, limit } = req.query
      const pageValue = page as any as number
      const limitValue = limit as any as number

      const data = await this.notificationService.getNotifications(
        req.user,
        pageValue,
        limitValue,
      )
      res.status(201).json({
        message: "Notification fetched",
        status: "success",
        data,
      })
    } catch (e: any) {
      next(e)
    }
  }

  async markNotificationAsRead(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const notificationId = req.params.id
      const userId = req.user?.user_id as string

      await this.notificationService.markNotificationAsRead(
        notificationId,
        userId,
      )
      res.status(200).json({
        message: "Notification marked as read",
        status: "success",
      })
    } catch (e: any) {
      next(e)
    }
  }
}
