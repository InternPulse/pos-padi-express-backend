import { Transaction } from "@prisma/client"
import { z } from "zod"
import transactionRepo from "../repo/transaction.repo"
import { getAllTransactionsSchema } from "../validators/transaction.schema"
import { ReqUser } from "../../../shared/types"
import notificationService from "../../notification/services/notification.service"

/*
createTransactionService(data, user)
Calls the repository function to create a transaction.
After creation, it triggers a notification to the user.
Returns the enriched transaction object.
*/

export async function createTransactionService(
  data: Transaction,
  user: ReqUser,
) {
  const transaction = await transactionRepo.createTransaction(data, user)

  await notificationService.createNotification({
    user_id: user.user_id,
    company_id: user.company_id,
    type: "transaction",
    message: `Transaction created with reference ${transaction.reference}`,
    title: "Transaction Created",
    data: transaction,
  })

  return transaction
}

/*
getTransactionByIdService(id, user)
A simple passthrough to fetch a transaction by ID using the repo.
Includes access control via the user object.
*/

export async function getTransactionByIdService(id: string, user: ReqUser) {
  return transactionRepo.getTransactionById(id, user)
}

/*
getAllTransactionsService(query, user)
Validates input using getAllTransactionsSchema.
Retrieves a paginated, filtered list of transactions for the user.
*/
export async function getAllTransactionsService(
  query: z.infer<typeof getAllTransactionsSchema>,
  user: ReqUser,
) {
  return transactionRepo.getAllTransactions(query, user)
}

/*
updateTransactionService(id, data, user)
Calls repo to update the transaction.
If the update is successful, sends a notification.
*/
export async function updateTransactionService(
  id: string,
  data: Partial<Transaction>,
  user: ReqUser,
) {
  const transaction = await transactionRepo.updateTransaction(id, data, user)

  if (transaction) {
    await notificationService.createNotification({
      user_id: user.user_id,
      company_id: user.company_id,
      type: "transaction",
      message: `Transaction updated with reference ${transaction.reference}`,
      title: "Transaction Updated",
      data: transaction,
    })
  }

  return transaction
}

/*
deleteTransactionService(id, user)
Calls repo to soft delete the transaction (is_active = false).
Sends a notification if deletion is successful.
*/
export async function deleteTransactionService(id: string, user: ReqUser) {
  const transaction = await transactionRepo.deleteTransaction(id, user)

  if (transaction) {
    await notificationService.createNotification({
      user_id: user.user_id,
      company_id: user.company_id,
      type: "transaction",
      message: `Transaction deleted with reference ${transaction.reference}`,
      title: "Transaction Deleted",
      data: transaction,
    })
  }

  return transaction
}

/*
getTransactionStatsService()
Calls the repo to get overall stats (total amount, count, trends).
*/
export async function getTransactionStatsService() {
  return transactionRepo.getTransactionStats()
}

/*
getAgentTransactionStatsService(agentId)
Gets agent-specific statistics from the repo.
*/
export async function getAgentTransactionStatsService(agentId: string) {
  return transactionRepo.getAgentTransactionStats(agentId)
}
