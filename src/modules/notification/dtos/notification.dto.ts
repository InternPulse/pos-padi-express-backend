export default interface createNotificationDTO {
  user_id: string | null
  company_id: string
  type: string
  message: string
  title: string
  data?: Record<string, any>
}
