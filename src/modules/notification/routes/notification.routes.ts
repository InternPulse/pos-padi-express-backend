import { Application, Request, Response } from "express"
import express from "express"
import createNewNotification from "../services/notification.service"

export function notificationRoutes(app: Application) {
  const router = express.Router()

// POST: Create a new notification
router.post("/", async (req: Request, res: Response) => {
  const { userId, type, message, title } = req.body
  try {
    const notification = await createNewNotification(
      userId,
      type,
      message,
      title,
    )
    res.status(201).json({ success: true, notification })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create notification",
      error,
    })
  }
})

// GET: Fetch all notifications for a user
// PATCH: Mark notification as read

  app.use("/api/v1/notification", router)
}

