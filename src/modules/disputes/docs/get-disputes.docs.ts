/**
 * @swagger
 * /api/v1/disputes:
 *   get:
 *     summary: Get all disputes
 *     description: Retrieve a list of disputes with optional filters for pagination, sorting, and filtering by various fields.
 *     tags:
 *       - Disputes
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
 *           enum: [created_at, updated_at, status, is_active]
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
 *         description: A search term to filter disputes.
 *       - name: date_from
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         description: The start date for filtering disputes.
 *       - name: date_to
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         description: The end date for filtering disputes.
 *       - name: transaction_id
 *         in: query
 *         required: false
 *         schema:
 *           oneOf:
 *             - type: string
 *             - type: array
 *               items:
 *                 type: string
 *         description: The transaction ID(s) to filter disputes.
 *       - name: status
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           enum: [Pending, Resolved, Rejected]
 *         description: The status of the disputes to filter by.
 *       - name: is_active
 *         in: query
 *         required: false
 *         schema:
 *           type: boolean
 *         description: Filter disputes by their active status.
 *     responses:
 *       200:
 *         description: List of disputes retrieved successfully.
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
 *                     example: "Invalid sort_key value"
 */
