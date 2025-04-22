/**
 * @swagger
 * /api/v1/disputes:
 *   post:
 *     summary: Create a new dispute
 *     description: Create a new dispute for a specific transaction.
 *     tags:
 *       - Disputes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               transaction_id:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of the transaction associated with the dispute.
 *                 example: "d290f1ee-6c54-4b01-90e6-d701748f0851"
 *               status:
 *                 type: string
 *                 enum: [Pending, Resolved, Rejected]
 *                 description: The status of the dispute. Defaults to "Pending".
 *                 example: "Pending"
 *               resolution_notes:
 *                 type: string
 *                 nullable: true
 *                 description: Notes or comments about the resolution of the dispute.
 *                 example: "Customer refunded partially."
 *               is_active:
 *                 type: boolean
 *                 description: Indicates whether the dispute is active. Defaults to `true`.
 *                 example: true
 *     responses:
 *       201:
 *         description: Dispute created successfully.
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
 *                     example: "transaction_id must be a valid UUID"
 */
