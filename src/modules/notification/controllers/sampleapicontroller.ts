import express from "express"
import createNotificationForUser from "../services/notification.service" // Notification service

const router = express.Router()

router.post("/create-transaction", async (req, res) => {
  const { userId, transactionDetails } = req.body

  try {
    // Step 1: Create the transaction (this could be a call to your service or model)

    // Step 2: Create and send a notification related to the transaction
    const notificationMessage = `Transaction of amount ${transactionDetails.amount} has been created.`
    const notificationTitle = "New Transaction"
    await createNotificationForUser(
      userId,
      "transaction",
      notificationMessage,
      notificationTitle,
    )

    // Optionally, notify other users involved in the transaction (if applicable)
    if (transactionDetails.recipientId) {
      const recipientMessage = `You have received a transaction of ${transactionDetails.amount} from ${userId}.`
      await createNotificationForUser(
        transactionDetails.recipientId,
        "transaction",
        recipientMessage,
        "New Transaction Received",
      )
    }

    res.status(201).json({
      message: "Transaction created successfully",
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Something went wrong" })
  }
})

export default router
