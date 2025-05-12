import { Application, Router } from "express"
import {
  createTransaction,
  getTransactionById,
  getAllTransactions,
  updateTransaction,
  deleteTransaction,
  getTransactionStats,
  getAgentTransactionStats,
} from "../controllers/transaction.controller"
import validateRequest from "../../../shared/middleware/validation/request"
import {
  createTransactionSchema,
  getAllTransactionsSchema,
  updateTransactionSchema,
} from "../validators/transaction.schema"
import restrictToRoles from "../../../shared/middleware/security/permissions"

const router = Router()

/*
POST /api/v1/transactions/
Purpose: Create a transaction.
Roles allowed: owner, agent
Validation: createTransactionSchema on request body.
Controller: createTransaction
*/
router.post(
  "/",
  restrictToRoles(["owner", "agent"]),
  validateRequest(createTransactionSchema, "body"),
  createTransaction,
)

/*
GET /api/v1/transactions/
Purpose: Fetch paginated & filtered list of transactions.
Roles allowed: owner, agent
Validation: getAllTransactionsSchema on query params.
Controller: getAllTransactions
*/
router.get(
  "/",
  restrictToRoles(["owner", "agent"]),
  validateRequest(getAllTransactionsSchema),
  getAllTransactions,
)

/*
GET /api/v1/transactions/stats
Purpose: Fetch global transaction stats.
Roles allowed: owner only.
Controller: getTransactionStats
*/
router.get("/stats", restrictToRoles(["owner"]), getTransactionStats)

/*
GET /api/v1/transactions/agent/:agent_id/stats
Purpose: Fetch stats for a specific agent.
Roles allowed: owner, agent
Controller: getAgentTransactionStats
*/
router.get(
  "/agent/:agent_id/stats",
  restrictToRoles(["owner", "agent"]),
  getAgentTransactionStats,
)

/*
GET /api/v1/transactions/:id
Purpose: Get a specific transaction by ID.
Roles allowed: owner, agent
Controller: getTransactionById
*/
router.get("/:id", restrictToRoles(["owner", "agent"]), getTransactionById)

/*
PUT /api/v1/transactions/:id
Purpose: Update a specific transaction.
Roles allowed: owner, agent
Validation: updateTransactionSchema on request body.
Controller: updateTransaction
*/
router.put(
  "/:id",
  restrictToRoles(["owner", "agent"]),
  validateRequest(updateTransactionSchema, "body"),
  updateTransaction,
)

/*
DELETE /api/v1/transactions/:id
Purpose: Soft delete a transaction.
Roles allowed: owner, agent
Controller: deleteTransaction
*/
router.delete("/:id", restrictToRoles(["owner", "agent"]), deleteTransaction)

/*
This registers all defined routes under /api/v1/transactions.
*/
export default function transactionRoutes(app: Application) {
  app.use("/api/v1/transactions", router)
}
