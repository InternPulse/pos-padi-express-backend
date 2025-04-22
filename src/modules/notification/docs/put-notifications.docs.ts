/**
 * @swagger
 * /api/v1/notifications/{id}:
 *   put:
 *     summary: Update a notification
 *     description: Update the details of an existing notification by its ID.
 *     tags:
 *       - Notifications
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the notification to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The updated title of the notification.
 *                 example: "Updated Message"
 *               message:
 *                 type: string
 *                 description: The updated message content of the notification.
 *                 example: "Your message has been updated."
 *               userId:
 *                 type: integer
 *                 description: The updated user ID associated with the notification.
 *                 example: 123
 *               type:
 *                 type: string
 *                 description: The updated type of the notification.
 *                 example: "alert"
 *     responses:
 *       200:
 *         description: Notification updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
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
 *                   example: "Notification not found"
 */
