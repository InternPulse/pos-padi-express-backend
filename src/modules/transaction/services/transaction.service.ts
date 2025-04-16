import { Transaction } from "@prisma/client"
import { z } from "zod"
import transactionRepo from "../repo/transaction.repo"
import { getAllTransactionsSchema } from "../validators/transaction.schema"

export async function createTransactionService(data: Transaction) {
  return transactionRepo.createTransaction(data)
}

export async function getTransactionByIdService(id: string) {
  return transactionRepo.getTransactionById(id)
}

export async function getAllTransactionsService(
  query: z.infer<typeof getAllTransactionsSchema>,
) {
  return transactionRepo.getAllTransactions(query)
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
