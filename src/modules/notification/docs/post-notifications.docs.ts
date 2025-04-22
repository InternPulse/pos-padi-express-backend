/**
 * @swagger
 * /api/v1/notifications:
 *   post:
 *     summary: Create a new notification
 *     description: Create a new notification with the specified details.
 *     tags:
 *       - Notifications
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the notification.
 *                 example: "New Message"
 *               message:
 *                 type: string
 *                 description: The message content of the notification.
 *                 example: "You have a new message in your inbox."
 *               userId:
 *                 type: integer
 *                 description: The ID of the user to whom the notification is sent.
 *                 example: 123
 *               type:
 *                 type: string
 *                 description: The type of the notification (e.g., info, warning, alert).
 *                 example: "info"
 *     responses:
 *       201:
 *         description: Notification created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad request. Validation failed for the input data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Validation error"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "Title is required"
 */
