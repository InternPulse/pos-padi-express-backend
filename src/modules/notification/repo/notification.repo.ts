import { PrismaClient } from "@prisma/client"
import logger from "../../../core/logging/logger"
import ApiError from "../../../shared/utils/ApiError"
import createNotificationDTO from "../dtos/notification.dto"

export default class NotificationRepo {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async createNotification(data: createNotificationDTO) {
    try {
      logger.debug("[Notification_Repo]: Creating notification", data)
      const notification = await this.prisma.notification.create({
        data,
      })
      logger.info("[Notification_Repo]: Notification created successfully")
      return notification
    } catch (e: any) {
      console.log(e)
      throw new ApiError(
        "[Notification_Repo]: Failed to create notification",
        500,
      )
    }
  }

  async getNotificationById(id: number, userId: string) {
    logger.debug("[Notification_Repo]: Getting notification by id", id)
    const notification = await this.prisma.notification.findUnique({
      where: { id, userId },
    })

    if (!notification) {
      logger.error("[Notification_Repo]: Notification not found")
      throw new ApiError("Notification not found", 404)
    }

    logger.info("[Notification_Repo]: Notification fetched successfully")
    return notification
  }

  async getNotifications(userId: string, page?: number, limit?: number) {
    try {
      // Fallback to defaults if invalid or undefined
      const currentPage = Number(page) > 0 ? Number(page) : 1
      const currentLimit = Number(limit) > 0 ? Number(limit) : 10

      const skip = (currentPage - 1) * currentLimit

      logger.debug("[Notification_Repo]: Getting notifications")
      const [notifications, total] = await this.prisma.$transaction([
        this.prisma.notification.findMany({
          where: { userId },
          orderBy: { createdAt: "desc" },
          skip,
          take: currentLimit,
        }),
        this.prisma.notification.count({
          where: { userId },
        }),
      ])

      logger.info("[Notification_Repo]: Notifications fetched successfully")
      return {
        notifications,
        meta: {
          total,
          page: currentPage,
          limit: currentLimit,
          totalPages: Math.ceil(total / currentLimit),
        },
      }
    } catch (e: any) {
      logger.error("[Notification_Repo]: Failed to get notifications")
      throw new ApiError("Failed to get notifications", 500)
    }
  }

  async markNotificationAsRead(id: number, userId: string) {
    logger.debug("[Notification_Repo]: Marking notification as read")
    const result = await this.prisma.notification.updateMany({
      where: { id, userId },
      data: { read: true },
    })

    if (result.count === 0) {
      logger.error("[Notification_Repo]: Notification not found")
      throw new ApiError("Notification not Found", 404)
    }

    logger.info("[Notification_Repo]: Notification marked as read")
  }
}
