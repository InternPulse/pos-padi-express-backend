import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Create a new notification
const createNotification = async (
  userId: number,
  type: string,
  message: string,
  title: string,
  data?: Record<string, any>,
) => {
  return prisma.notification.create({
    data: {
      userId,
      type,
      message,
      title,
      data,
    },
  })
}

// Fetch notifications for a user
// Mark a notification as read

export default createNotification
