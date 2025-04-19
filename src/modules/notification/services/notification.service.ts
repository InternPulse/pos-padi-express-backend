import createNotification from "../models/notification.model"
import { sendNotificationToUser } from "../../../core/websocket"

const createNewNotification = async (
  userId: number,
  type: string,
  message: string,
  title: string,
) => {
  // create the notification in the database
  const notification = await createNotification(userId, type, message, title)

  // send notification to the user's WebSocket in real-time
  sendNotificationToUser(userId, notification)

  // return the notification object
  return notification
}

export default createNewNotification
