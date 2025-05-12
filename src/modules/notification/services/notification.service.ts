import { ReqUser } from "../../../shared/types"
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

  async getNotificationById(id: string, user: ReqUser) {
    const notification = await this.repo.getNotificationById(id, user)
    return notification
  }

  async getNotifications(user: ReqUser, page: number, limit: number) {
    const data = await this.repo.getNotifications(user, page, limit)
    return data
  }

  async markNotificationAsRead(id: string, user: ReqUser) {
    await this.repo.markNotificationAsRead(id, user)
  }
}
// comment
const notificationService = new NotificationService(new NotificationRepo())
export default notificationService
