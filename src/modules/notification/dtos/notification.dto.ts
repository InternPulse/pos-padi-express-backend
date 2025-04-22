export default interface createNotificationDTO {
  userId: string
  type: string
  message: string
  title: string
  data?: Record<string, any>
}
