/**
 * @swagger
 * /api/v1/transactions:
 *   get:
 *     tags:
 *       - Transactions
 *     summary: Get all transactions
 *     description: Retrieve a list of all transactions with optional filters.
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: The page number for pagination.
 *       - name: limit
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: The number of items per page for pagination.
 *       - name: sort_key
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           enum: [created_at, updated_at, description, amount, fee, type, rating, status]
 *         description: The field to sort the results by.
 *       - name: sort_direction
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: The direction to sort the results (ascending or descending).
 *       - name: search
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: A search term to filter transactions.
 *       - name: date_from
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         description: The start date for filtering transactions.
 *       - name: date_to
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         description: The end date for filtering transactions.
 *       - name: agent_id
 *         in: query
 *         required: false
 *         schema:
 *           oneOf:
 *             - type: string
 *             - type: array
 *               items:
 *                 type: string
 *         description: The agent ID(s) to filter transactions.
 *       - name: customer_id
 *         in: query
 *         required: false
 *         schema:
 *           oneOf:
 *             - type: string
 *             - type: array
 *               items:
 *                 type: string
 *         description: The customer ID(s) to filter transactions.
 *       - name: status
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: The status to filter transactions.
 *       - name: type
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: The type of transaction (e.g., credit or debit).
 *       - name: min_amount
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: The minimum amount to filter transactions.
 *       - name: max_amount
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: The maximum amount to filter transactions.
 *       - name: min_fee
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: The minimum fee to filter transactions.
 *       - name: max_fee
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: The maximum fee to filter transactions.
 *       - name: min_rating
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: The minimum rating to filter transactions.
 *       - name: max_rating
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: The maximum rating to filter transactions.
 *     responses:
 *       200:
 *         description: List of transactions
 */

/**
 * @swagger
 * /api/v1/transactions/{id}:
 *   get:
 *     summary: Get a transaction by ID
 *     description: Retrieve the details of a specific transaction by its ID.
 *     tags:
 *       - Transactions
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the transaction to retrieve.
 *     responses:
 *       200:
 *         description: Transaction retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
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
