/**
 * @swagger
 * /api/v1/transactions/{id}:
 *   put:
 *     tags:
 *       - Transactions
 *     summary: Update an existing transaction
 *     description: Update the details of an existing transaction by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the transaction to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id:
 *                 type: string
 *                 description: The ID of the customer associated with the transaction.
 *                 example: "customer1"
 *               amount:
 *                 type: number
 *                 description: The amount involved in the transaction.
 *                 example: 200.5
 *               fee:
 *                 type: number
 *                 description: The fee associated with the transaction.
 *                 example: 5.0
 *               type:
 *                 type: string
 *                 description: The type of transaction (e.g., credit or debit).
 *                 example: "debit"
 *               status:
 *                 type: string
 *                 description: The status of the transaction (e.g., completed, pending).
 *                 example: "pending"
 *     responses:
 *       200:
 *         description: Transaction updated successfully.
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
 *                     example: "amount must be a positive number"
 *       404:
 *         description: Transaction not found.
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
 *                   example: "Transaction not found"
 */
