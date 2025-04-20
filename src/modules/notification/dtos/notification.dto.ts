export default interface createNotificationDTO {
  userId: number
  type: string
  message: string
  title: string
  data?: Record<string, any>
}
