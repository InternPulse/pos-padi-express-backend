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
 *                 type: string
 *                 description: The ID of the user to whom the notification is sent.( Valid UUID format )
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               type:
 *                 type: string
 *                 description: The type of the notification (e.g., info, warning, alert).
 *                 example: "info"
 *               data:
 *                 type: object
 *                 description: Optional additional data for the notification.
 *                 example:
 *                   property1: "value"
 *                   property2: "value"
 *                   property3: "value"
 *                   propertyN: "value"
 *     responses:
 *       201:
 *         description: Notification created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Notification created successfully"
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 9
 *                     userId:
 *                       type: string
 *                       example: "d5f0c0c4-8d47-4ad1-8f64-d3125e11e52b"
 *                     title:
 *                       type: string
 *                       example: "Dispute from user"
 *                     message:
 *                       type: string
 *                       example: "User xyz had a transaction dispute"
 *                     data:
 *                       type: object
 *                       example:
 *                         key: "value"
 *                     deliveredAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-04-22T16:45:30.095Z"
 *                     type:
 *                       type: string
 *                       example: "transaction"
 *                     read:
 *                       type: boolean
 *                       example: false
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-04-22T16:45:30.095Z"
 *                     readAt:
 *                       type: string
 *                       format: date-time
 *                       nullable: true
 *                       example: null
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
 *       500:
 *         description: Internal server error.
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
 *                   example: "Error creating notification"
 */
