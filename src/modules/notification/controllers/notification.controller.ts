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
      const { id } = req.params
      const notificationId = parseInt(id, 10)
      const userId =
        (req.user?.id as string) ?? "d5f0c0c4-8d47-4ad1-8f64-d3125e11e52b"

      const notification = await this.notificationService.getNotificationById(
        notificationId,
        userId,
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

      console.log(pageValue, limitValue)
      const userId =
        (req.user?.id as string) ?? "d5f0c0c4-8d47-4ad1-8f64-d3125e11e52b"

      const data = await this.notificationService.getNotifications(
        userId,
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
      const { id } = req.params
      const notificationId = parseInt(id, 10)
      const userId =
        (req.user?.id as string) ?? "d5f0c0c4-8d47-4ad1-8f64-d3125e11e52b"

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
