import { Request, Response } from "express"
import {
  createTransactionService,
  getTransactionByIdService,
  getAllTransactionsService,
  updateTransactionService,
  deleteTransactionService,
  getTransactionStatsService,
  getAgentTransactionStatsService,
} from "../services/transaction.service"
import success from "../../../shared/utils/misc/success"

export async function createTransaction(req: Request, res: Response) {
  try {
    const transaction = await createTransactionService(req.body)
    res
      .status(201)
      .json(success(transaction, "Transaction created successfully"))
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
    res
      .status(200)
      .json(success(transaction, "Transaction retrieved successfully"))
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export async function getAllTransactions(req: Request, res: Response) {
  try {
    const { transactions, pagination } = await getAllTransactionsService(
      req.query,
    )
    res.status(200).json(
      success(transactions, "Transactions retrieved successfully", {
        pagination,
      }),
    )
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export async function updateTransaction(req: Request, res: Response) {
  try {
    const transaction = await updateTransactionService(req.params.id, req.body)
    if (!transaction) {
      res.status(404).json({ success: false, message: "Transaction not found" })
      return
    }
    res
      .status(200)
      .json(success(transaction, "Transaction updated successfully"))
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export async function deleteTransaction(req: Request, res: Response) {
  try {
    const transaction = await deleteTransactionService(req.params.id)
    if (!transaction) {
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

export async function getTransactionStats(req: Request, res: Response) {
  try {
    const stats = await getTransactionStatsService()
    res.status(200).json(success(stats, "Admin Transaction stats retrieved successfully"))
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export async function getAgentTransactionStats(req: Request, res: Response) {
  try {
    const agentId = req.params.agent_id
    const stats = await getAgentTransactionStatsService(agentId)

    res.status(200).json(success(stats, "Agent transaction stats retrieved successfully"))
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
  }
}

