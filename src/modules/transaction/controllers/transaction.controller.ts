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
import { agentIdFromReq } from "../utils/id-from-req"

/*
createTransaction
Checks agent authorization using agentIdFromReq.
If authorized, creates the transaction using the service.
Sends a success response (201) with the transaction.
If unauthorized: returns 403 Forbidden.
*/
export async function createTransaction(req: Request, res: Response) {
  try {
    const agentId = agentIdFromReq(req)

    if (!agentId) {
      res.status(403).json({
        success: false,
        message: "You are not authorized to create a transaction",
      })
      return
    }

    const transaction = await createTransactionService(req.body, req.user)
    res
      .status(201)
      .json(success(transaction, "Transaction created successfully"))
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
  }
}

/*
getTransactionById
Gets the transaction by ID.
If not found: returns 404.
Then checks if the requesting agent is allowed to view it.
If authorized: returns the transaction (200).
If unauthorized: returns 403.
*/
export async function getTransactionById(req: Request, res: Response) {
  try {
    const transaction = await getTransactionByIdService(req.params.id, req.user)
    if (!transaction) {
      res.status(404).json({ success: false, message: "Transaction not found" })
      return
    }

    const agentId = agentIdFromReq(req)

    if (agentId && transaction.agent_id && agentId !== transaction.agent_id) {
      res.status(403).json({
        success: false,
        message: "You are not authorized to access this transaction",
      })
      return
    }

    res
      .status(200)
      .json(success(transaction, "Transaction retrieved successfully"))
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
  }
}

/*
getAllTransactions
Gets a paginated, filtered list of transactions.
Accepts filters/sorting/pagination from req.query.
Returns transactions and pagination metadata.
*/
export async function getAllTransactions(req: Request, res: Response) {
  try {
    const { transactions, pagination } = await getAllTransactionsService(
      req.query,
      req.user,
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

/*
updateTransaction
Gets the transaction first to check if it exists.
Checks if the current user is authorized to update it.
If so, calls the service to update it.
Returns the updated transaction or appropriate error codes (403, 404).
*/
export async function updateTransaction(req: Request, res: Response) {
  try {
    const agentId = agentIdFromReq(req)

    let transaction = await getTransactionByIdService(req.params.id, req.user)

    if (!transaction) {
      res.status(404).json({ success: false, message: "Transaction not found" })
      return
    }

    if (agentId && transaction.agent_id && agentId !== transaction.agent_id) {
      res.status(403).json({
        success: false,
        message: "You are not authorized to access this transaction",
      })
      return
    }

    transaction = await updateTransactionService(
      req.params.id,
      req.body,
      req.user,
    )

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

/*
deleteTransaction
Performs soft delete of a transaction.
Steps:
Check if transaction exists.
Check if user is authorized.
Soft delete via the service.
Return success or 404.
*/
export async function deleteTransaction(req: Request, res: Response) {
  try {
    const agentId = agentIdFromReq(req)

    let transaction = await getTransactionByIdService(req.params.id, req.user)

    if (!transaction) {
      res.status(404).json({ success: false, message: "Transaction not found" })
      return
    }

    if (agentId && transaction.agent_id && agentId !== transaction.agent_id) {
      res.status(403).json({
        success: false,
        message: "You are not authorized to access this transaction",
      })
      return
    }

    transaction = await deleteTransactionService(req.params.id, req.user)
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

/*
getTransactionStats
Admin-level endpoint to fetch global transaction analytics.
Returns metrics like total amounts, revenue, agent/customer counts, and trends.
*/
export async function getTransactionStats(req: Request, res: Response) {
  try {
    const stats = await getTransactionStatsService()
    res
      .status(200)
      .json(success(stats, "Admin Transaction stats retrieved successfully"))
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
  }
}

/*
getAgentTransactionStats
Agent-specific stats, based on agent ID in the URL (req.params.agent_id).
Same structure as the admin one, but scoped to a single agent.
*/
export async function getAgentTransactionStats(req: Request, res: Response) {
  try {
    const agentId = req.params.agent_id
    const stats = await getAgentTransactionStatsService(agentId)

    res
      .status(200)
      .json(success(stats, "Agent transaction stats retrieved successfully"))
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
  }
}
