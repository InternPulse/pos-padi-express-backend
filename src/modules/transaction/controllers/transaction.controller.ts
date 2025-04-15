import { Request, Response } from "express"
import {
  createTransactionService,
  getTransactionByIdService,
  getAllTransactionsService,
  updateTransactionService,
  deleteTransactionService,
} from "../services/transaction.service"

export async function createTransaction(req: Request, res: Response) {
  try {
    const transaction = await createTransactionService(req.body)
    res.status(201).json({ success: true, data: transaction })
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export async function getTransactionById(req: Request, res: Response) {
  try {
    const transaction = await getTransactionByIdService(req.params.id)
    if (!transaction) {
      res.status(404).json({ success: false, message: "Transaction not found" })
      return
    }
    res.status(200).json({ success: true, data: transaction })
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export async function getAllTransactions(req: Request, res: Response) {
  try {
    const transactions = await getAllTransactionsService()
    res.status(200).json({ success: true, data: transactions })
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export async function updateTransaction(req: Request, res: Response) {
  try {
    const updatedTransaction = await updateTransactionService(
      req.params.id,
      req.body,
    )
    if (!updatedTransaction) {
      res.status(404).json({ success: false, message: "Transaction not found" })
      return
    }
    res.status(200).json({ success: true, data: updatedTransaction })
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export async function deleteTransaction(req: Request, res: Response) {
  try {
    const deleted = await deleteTransactionService(req.params.id)
    if (!deleted) {
      res.status(404).json({ success: false, message: "Transaction not found" })
      return
    }
    res
      .status(200)
      .json({ success: true, message: "Transaction deleted successfully" })
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
  }
}
