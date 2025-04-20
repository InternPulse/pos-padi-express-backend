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

const router = Router()

router.post(
  "/",
  validateRequest(createTransactionSchema, "body"),
  createTransaction,
)
router.get("/", validateRequest(getAllTransactionsSchema), getAllTransactions)
router.get("/stats", getTransactionStats)
router.get("/agent/:agent_id/stats", getAgentTransactionStats)
router.get("/:id", getTransactionById)
router.put(
  "/:id",
  validateRequest(updateTransactionSchema, "body"),
  updateTransaction,
)
router.delete("/:id", deleteTransaction)

export default function transactionRoutes(app: Application) {
  app.use("/api/v1/transactions", router)
}
