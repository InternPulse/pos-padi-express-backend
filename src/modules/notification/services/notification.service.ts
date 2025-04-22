import createNotificationDTO from "../dtos/notification.dto"
import NotificationRepo from "../repo/notification.repo"

export class NotificationService {
  constructor(private repo: NotificationRepo) {}

  async createNotification(data: createNotificationDTO) {
    // let { userId } = data
    // userId = (userId as string) || "sampleuserid"
    const notification = await this.repo.createNotification(data)
    // sendNotificationToUser(userId, notification) /****COMMENTED OUT FOR TYPE ISSUE */
    return notification
  }

  async getNotificationById(id: number, userId: string) {
    const notification = await this.repo.getNotificationById(id, userId)
    return notification
  }

  async getNotifications(userId: string, page: number, limit: number) {
    const data = await this.repo.getNotifications(userId, page, limit)
    return data
  }

  async markNotificationAsRead(id: number, userId: string) {
    await this.repo.markNotificationAsRead(id, userId)
  }
}
// comment
const notificationService = new NotificationService(new NotificationRepo())
export default notificationService
