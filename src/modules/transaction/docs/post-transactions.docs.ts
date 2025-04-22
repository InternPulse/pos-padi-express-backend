/**
 * @swagger
 * /api/v1/transactions:
 *   post:
 *     summary: Create a new transaction
 *     description: Create a new transaction with the specified details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               agent_id:
 *                 type: string
 *                 description: The ID of the agent associated with the transaction.
 *                 example: "agent1"
 *               customer_id:
 *                 type: string
 *                 description: The ID of the customer associated with the transaction.
 *                 example: "customer1"
 *               description:
 *                 type: string
 *                 description: A brief description of the transaction.
 *                 example: "Payment for services rendered"
 *               amount:
 *                 type: number
 *                 description: The amount involved in the transaction.
 *                 example: 150.75
 *               fee:
 *                 type: number
 *                 description: The fee associated with the transaction.
 *                 example: 2.5
 *               type:
 *                 type: string
 *                 description: The type of transaction (e.g., credit or debit).
 *                 example: "credit"
 *               status:
 *                 type: string
 *                 description: The status of the transaction (e.g., completed, pending).
 *                 example: "completed"
 *     responses:
 *       201:
 *         description: Transaction created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
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
 *                     example: "agent_id is required"
 */
