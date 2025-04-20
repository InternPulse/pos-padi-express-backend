import { sendNotificationToUser } from "../../../core/websocket"
import createNotificationDTO from "../dtos/notification.dto"
import NotificationRepo from "../repo/notification.repo"

export class NotificationService {
  constructor(private repo: NotificationRepo) {}

  async createNotification(data: createNotificationDTO) {
    const { userId } = data
    const notification = await this.repo.createNotification(data)
    sendNotificationToUser(userId, notification)
    return notification
  }

  async getNotificationById(id: number, userId: number) {
    const notification = await this.repo.getNotificationById(id, userId)
    return notification
  }

  async getNotifications(userId: number, page: number, limit: number) {
    const data = await this.repo.getNotifications(userId, page, limit)
    return data
  }

  async markNotificationAsRead(id: number, userId: number) {
    await this.repo.markNotificationAsRead(id, userId)
  }
}
// comment
const notificationService = new NotificationService(new NotificationRepo())
export default notificationService
