/**
 * @swagger
 * /api/v1/transactions/stats:
 *   get:
 *     summary: Get transaction statistics
 *     description: Retrieve overall statistics for all transactions. Only accessible by owners.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Transactions
 *     responses:
 *       200:
 *         description: Successfully retrieved transaction statistics.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       403:
 *         description: Forbidden. User does not have the required role.
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
 *                   example: "Access denied."
 */

/**
 * @swagger
 * /api/v1/transactions/agent/{agent_id}/stats:
 *   get:
 *     summary: Get transaction statistics for a specific agent
 *     description: Retrieve transaction statistics for a specific agent. Accessible by owners and agents.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Transactions
 *     parameters:
 *       - name: agent_id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the agent whose transaction statistics are being retrieved.
 *     responses:
 *       200:
 *         description: Successfully retrieved transaction statistics for the agent.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       403:
 *         description: Forbidden. User does not have the required role.
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
 *                   example: "Access denied."
 *       404:
 *         description: Agent not found.
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
 *                   example: "Agent not found."
 */
