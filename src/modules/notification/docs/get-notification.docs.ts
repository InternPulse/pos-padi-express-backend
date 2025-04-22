/**
 * @swagger
 * /api/v1/notifications/{id}:
 *   get:
 *     summary: Retrieve a specific notification by its unique identifier
 *     description: Fetch the details of a specific notification using its unique identifier.
 *     tags:
 *       - Notifications
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the notification to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the notification.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Notification fetched"
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 11
 *                     userId:
 *                       type: string
 *                       example: "d5f0c0c4-8d47-4ad1-8f64-d3125e11e52b"
 *                     title:
 *                       type: string
 *                       example: "easel"
 *                     message:
 *                       type: string
 *                       example: "User xyz had a transaction dispute"
 *                     data:
 *                       type: object
 *                       additionalProperties:
 *                         type: string
 *                       example: { "key": "value" }
 *                     deliveredAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-04-22T17:37:57.766Z"
 *                     type:
 *                       type: string
 *                       example: "transaction"
 *                     read:
 *                       type: boolean
 *                       example: false
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-04-22T17:37:57.766Z"
 *                     readAt:
 *                       type: string
 *                       format: date-time
 *                       nullable: true
 *                       example: null
 *       404:
 *         description: Notification not found.
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
 *                   example: "Resource not found"
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
