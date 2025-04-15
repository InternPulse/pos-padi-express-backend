import { Transaction } from "@prisma/client"
import transactionRepo from "../repo/transaction.repo"

export async function createTransactionService(data: Transaction) {
  return transactionRepo.createTransaction(data)
}

export async function getTransactionByIdService(id: string) {
  return transactionRepo.getTransactionById(id)
}

export async function getAllTransactionsService() {
  return transactionRepo.getAllTransactions()
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
