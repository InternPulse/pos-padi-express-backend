import { Transaction } from "@prisma/client"
import { z } from "zod"
import transactionRepo from "../repo/transaction.repo"
import { getAllTransactionsSchema } from "../validators/transaction.schema"
import { ReqUser } from "../../../shared/types"
import notificationService from "../../notification/services/notification.service"

export async function createTransactionService(
  data: Transaction,
  user: ReqUser,
) {
  const transaction = await transactionRepo.createTransaction(data, user)

  await notificationService.createNotification({
    user_id: user.user_id,
    type: "transaction",
    message: `Transaction created with reference ${transaction.reference}`,
    title: "Transaction Created",
    data: transaction,
  })

  return transaction
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
  const transaction = await transactionRepo.updateTransaction(id, data, user)

  if (transaction) {
    await notificationService.createNotification({
      user_id: user.user_id,
      type: "transaction",
      message: `Transaction updated with reference ${transaction.reference}`,
      title: "Transaction Updated",
      data: transaction,
    })
  }

  return transaction
}

export async function deleteTransactionService(id: string, user: ReqUser) {
  const transaction = await transactionRepo.deleteTransaction(id, user)

  if (transaction) {
    await notificationService.createNotification({
      user_id: user.user_id,
      type: "transaction",
      message: `Transaction deleted with reference ${transaction.reference}`,
      title: "Transaction Deleted",
      data: transaction,
    })
  }

  return transaction
}

export async function getTransactionStatsService() {
  return transactionRepo.getTransactionStats()
}

export async function getAgentTransactionStatsService(agentId: string) {
  return transactionRepo.getAgentTransactionStats(agentId)
}
