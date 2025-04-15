import { Application, Router } from "express"
import {
  createTransaction,
  getTransactionById,
  getAllTransactions,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transaction.controller"

const router = Router()

router.post("/", createTransaction)
router.get("/", getAllTransactions)
router.get("/:id", getTransactionById)
router.put("/:id", updateTransaction)
router.delete("/:id", deleteTransaction)

export default function transactionRoutes(app: Application) {
  app.use("/api/v1/transactions", router)
}
