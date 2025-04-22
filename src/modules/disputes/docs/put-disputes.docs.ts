/**
 * @swagger
 * /api/v1/disputes/{id}:
 *   put:
 *     summary: Update an existing dispute
 *     description: Update the details of an existing dispute by its ID.
 *     tags:
 *       - Disputes
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ID of the dispute to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Pending, Resolved, Rejected]
 *                 description: The status of the dispute.
 *                 example: "Resolved"
 *               resolution_notes:
 *                 type: string
 *                 nullable: true
 *                 description: Notes or comments about the resolution of the dispute.
 *                 example: "Dispute resolved with a full refund."
 *               updated_at:
 *                 type: string
 *                 format: date-time
 *                 description: The timestamp of the last update. Defaults to the current date and time.
 *                 example: "2025-04-22T10:30:00Z"
 *               is_active:
 *                 type: boolean
 *                 description: Indicates whether the dispute is active.
 *                 example: false
 *     responses:
 *       200:
 *         description: Dispute updated successfully.
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
 *                     example: "status must be one of [Pending, Resolved, Rejected]"
 *       404:
 *         description: Dispute not found.
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
 *                   example: "Dispute not found"
 */
