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

  async getNotificationById(id: string, user_id: string) {
    const notification = await this.repo.getNotificationById(id, user_id)
    return notification
  }

  async getNotifications(user_id: string, page: number, limit: number) {
    const data = await this.repo.getNotifications(user_id, page, limit)
    return data
  }

  async markNotificationAsRead(id: string, user_id: string) {
    await this.repo.markNotificationAsRead(id, user_id)
  }
}
// comment
const notificationService = new NotificationService(new NotificationRepo())
export default notificationService
