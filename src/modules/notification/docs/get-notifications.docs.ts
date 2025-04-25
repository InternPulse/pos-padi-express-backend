/**
 * @swagger
 * /api/v1/notifications:
 *   get:
 *     summary: Retrieve notifications with pagination
 *     description: Fetch a paginated list of notifications for a user.
 *     tags:
 *       - Notifications
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         required: true
 *         description: The page number to retrieve.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         required: true
 *         description: The number of notifications per page.
 *     responses:
 *       200:
 *         description: Notifications retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Notifications retrieved successfully"
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     notifications:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "d5f0c0c4-8d47-4ad1-8f64-d3125e11e52b"
 *                           user_id:
 *                             type: string
 *                             example: "d5f0c0c4-8d47-4ad1-8f64-d3125e11e52b"
 *                           title:
 *                             type: string
 *                             example: "Dispute from user"
 *                           message:
 *                             type: string
 *                             example: "User xyz had a transaction dispute"
 *                           data:
 *                             type: object
 *                             example:
 *                               key: "value"
 *                           delivered_at:
 *                             type: string
 *                             format: date-time
 *                             example: "2025-04-22T16:45:30.095Z"
 *                           type:
 *                             type: string
 *                             example: "transaction"
 *                           read:
 *                             type: boolean
 *                             example: false
 *                           created_at:
 *                             type: string
 *                             format: date-time
 *                             example: "2025-04-22T16:45:30.095Z"
 *                           read_at:
 *                             type: string
 *                             format: date-time
 *                             nullable: true
 *                             example: null
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         page:
 *                           type: integer
 *                           example: 1
 *                         limit:
 *                           type: integer
 *                           example: 10
 *                         totalPages:
 *                           type: integer
 *                           example: 5
 *                         totalItems:
 *                           type: integer
 *                           example: 50
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
 *                     example: "Page must be a positive integer"
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
 *                   example: "Error retrieving notifications"
 */
