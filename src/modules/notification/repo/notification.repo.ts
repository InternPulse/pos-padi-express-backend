import { Notification, PrismaClient } from "@prisma/client"
import logger from "../../../core/logging/logger"
import ApiError from "../../../shared/utils/ApiError"
import createNotificationDTO from "../dtos/notification.dto"
import { getNotificationUserDetails } from "../utils"
import { ReqUser } from "../../../shared/types"

export default class NotificationRepo {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async createNotification(data: createNotificationDTO) {
    try {
      logger.debug("[Notification_Repo]: Creating notification", data)
      const [notification] = (await this.prisma.$transaction([
        this.prisma.notification.create({
          data,
        }),
        this.prisma.notification.create({
          data: { ...data, user_id: null },
        }),
      ])) as any[]

      logger.info("[Notification_Repo]: Notification created successfully")

      if (!notification.user_id) return notification

      const notificationUser = await getNotificationUserDetails(
        this.prisma,
        notification.user_id,
      )
      notification.user = notificationUser

      return notification
    } catch (e: any) {
      console.log(e)
      throw new ApiError(
        "[Notification_Repo]: Failed to create notification",
        500,
      )
    }
  }

  async getNotificationById(id: string, user: ReqUser) {
    logger.debug("[Notification_Repo]: Getting notification by id", id)

    const where: Record<string, unknown> = {}

    if (user.role === "owner" && user.company_id) {
      where.company_id = user.company_id
      where.user_id = null
    }

    if (user.role === "agent" && user.user_id) {
      where.user_id = user.user_id
    }

    const notification = (await this.prisma.notification.findUnique({
      where: { id, ...where },
    })) as any

    if (!notification) {
      logger.error("[Notification_Repo]: Notification not found")
      throw new ApiError("Notification not found", 404)
    }

    logger.info("[Notification_Repo]: Notification fetched successfully")

    if (!notification.user_id) return notification

    const notificationUser = await getNotificationUserDetails(
      this.prisma,
      notification.user_id,
    )
    notification.user = notificationUser

    return notification as Notification
  }

  async getNotifications(user: ReqUser, page?: number, limit?: number) {
    try {
      // Fallback to defaults if invalid or undefined
      const currentPage = Number(page) > 0 ? Number(page) : 1
      const currentLimit = Number(limit) > 0 ? Number(limit) : 10

      const skip = (currentPage - 1) * currentLimit

      const where: Record<string, unknown> = {}

      if (user.role === "owner" && user.company_id) {
        where.company_id = user.company_id
        where.user_id = null
      }

      if (user.role === "agent" && user.user_id) {
        where.user_id = user.user_id
      }

      logger.debug("[Notification_Repo]: Getting notifications")
      const [rawNotifications, total] = await this.prisma.$transaction([
        this.prisma.notification.findMany({
          where,
          orderBy: { created_at: "desc" },
          skip,
          take: currentLimit,
        }),
        this.prisma.notification.count({
          where,
        }),
      ])

      const notifications = await Promise.all(
        rawNotifications.map(async (n) => {
          const notification = { ...n } as any

          if (!n.user_id) return notification

          const notificationUser = await getNotificationUserDetails(
            this.prisma,
            n.user_id,
          )
          notification.user = notificationUser

          return notification
        }),
      )

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

  async markNotificationAsRead(id: string, user: ReqUser) {
    logger.debug("[Notification_Repo]: Marking notification as read")

    const where: Record<string, unknown> = {}

    if (user.role === "owner" && user.company_id) {
      where.company_id = user.company_id
      where.user_id = null
    }

    if (user.role === "agent" && user.user_id) {
      where.user_id = user.user_id
    }

    const result = await this.prisma.notification.updateMany({
      where: { id, ...where },
      data: { read: true },
    })

    if (result.count === 0) {
      logger.error("[Notification_Repo]: Notification not found")
      throw new ApiError("Notification not Found", 404)
    }

    logger.info("[Notification_Repo]: Notification marked as read")
  }
}
