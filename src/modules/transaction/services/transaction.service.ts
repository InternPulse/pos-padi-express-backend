import { Transaction } from "@prisma/client"
import { z } from "zod"
import transactionRepo from "../repo/transaction.repo"
import { getAllTransactionsSchema } from "../validators/transaction.schema"
import { ReqUser } from "../../../shared/types"

export async function createTransactionService(
  data: Transaction,
  user: ReqUser,
) {
  return transactionRepo.createTransaction(data, user)
}

export async function getTransactionByIdService(id: string, user: ReqUser) {
  return transactionRepo.getTransactionById(id, user)
}

export async function getAllTransactionsService(
  query: z.infer<typeof getAllTransactionsSchema>,
  user: ReqUser,
) {
  return transactionRepo.getAllTransactions(query, user)
}

export async function updateTransactionService(
  id: string,
  data: Partial<Transaction>,
  user: ReqUser,
) {
  return transactionRepo.updateTransaction(id, data, user)
}

export async function deleteTransactionService(id: string, user: ReqUser) {
  return transactionRepo.deleteTransaction(id, user)
}

export async function getTransactionStatsService() {
  return transactionRepo.getTransactionStats()
}

export async function getAgentTransactionStatsService(agentId: string) {
  return transactionRepo.getAgentTransactionStats(agentId)
}
