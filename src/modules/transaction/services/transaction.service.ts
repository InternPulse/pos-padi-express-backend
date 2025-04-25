import { Transaction } from "@prisma/client"
import { z } from "zod"
import transactionRepo from "../repo/transaction.repo"
import { getAllTransactionsSchema } from "../validators/transaction.schema"

export async function createTransactionService(
  data: Transaction,
  agentId: string,
) {
  return transactionRepo.createTransaction(data, agentId)
}

export async function getTransactionByIdService(id: string) {
  return transactionRepo.getTransactionById(id)
}

export async function getAllTransactionsService(
  query: z.infer<typeof getAllTransactionsSchema>,
  agentId?: string | number,
) {
  return transactionRepo.getAllTransactions(query, agentId)
}

export async function updateTransactionService(
  id: string,
  data: Partial<Transaction>,
) {
  return transactionRepo.updateTransaction(id, data)
}

export async function deleteTransactionService(id: string) {
  return transactionRepo.deleteTransaction(id)
}

export async function getTransactionStatsService() {
  return transactionRepo.getTransactionStats()
}

export async function getAgentTransactionStatsService(agentId: string) {
  return transactionRepo.getAgentTransactionStats(agentId)
}
