import { Application, Router } from "express"
import {
  getAllDisputesController,
  createDisputeController,
  getDisputeByIdController,
  updateDisputeController,
  deleteDisputeController,
  getDisputeStatsController,
} from "../controllers/dispute.controller"

import validateRequest from "../../../shared/middleware/validation/request"
import { createDisputeSchema } from "../validators/dispute.schema"
// import {
//   createTransaction,
//   getTransactionById,
//   getAllTransactions,
//   updateTransaction,
//   deleteTransaction,
//   getTransactionStats,
//   getAgentTransactionStats,
// } from "../controllers/transaction.controller"
// import validateRequest from "../../../shared/middleware/validation/request"
// import {
//   createTransactionSchema,
//   getAllTransactionsSchema,
//   updateTransactionSchema,
// } from "../validators/transaction.schema"

const router = Router()
router.get("/", getAllDisputesController)
router.get("/:id", getDisputeByIdController)
router.put(
  "/:id",
  validateRequest(createDisputeSchema, "body"),
  updateDisputeController,
)
router.delete("/:id", deleteDisputeController)
router.get("/stats", getDisputeStatsController)
router.post(
  "/",
  validateRequest(createDisputeSchema, "body"),
  createDisputeController,
)

// router.post(
//   "/",
//   validateRequest(createTransactionSchema, "body"),
//   createTransaction,
// )
// router.get("/", validateRequest(getAllTransactionsSchema), getAllTransactions)
// router.get("/stats", getTransactionStats)
// router.get("/agent/:agent_id/stats", getAgentTransactionStats)
// router.get("/:id", getTransactionById)
// router.put(
//   "/:id",
//   validateRequest(updateTransactionSchema, "body"),
//   updateTransaction,
// )
// router.delete("/:id", deleteTransaction)

export default (app: Application) => app.use("/api/v1/disputes", router)
