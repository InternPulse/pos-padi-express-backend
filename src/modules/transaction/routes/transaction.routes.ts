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

router.post(
  "/",
  restrictToRoles(["owner", "agent"]),
  validateRequest(createTransactionSchema, "body"),
  createTransaction,
)

router.get(
  "/",
  restrictToRoles(["owner", "agent"]),
  validateRequest(getAllTransactionsSchema),
  getAllTransactions,
)

router.get("/stats", restrictToRoles(["owner"]), getTransactionStats)

router.get(
  "/agent/:agent_id/stats",
  restrictToRoles(["owner", "agent"]),
  getAgentTransactionStats,
)

router.get("/:id", restrictToRoles(["owner", "agent"]), getTransactionById)

router.put(
  "/:id",
  restrictToRoles(["owner", "agent"]),
  validateRequest(updateTransactionSchema, "body"),
  updateTransaction,
)

router.delete("/:id", restrictToRoles(["owner", "agent"]), deleteTransaction)

export default function transactionRoutes(app: Application) {
  app.use("/api/v1/transactions", router)
}
