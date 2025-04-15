import { PrismaClient, Transaction } from "@prisma/client"
import { z } from "zod"
import { getAllTransactionsSchema } from "../validators/transaction.schema"
import getPagination from "../../../shared/utils/misc/get-pagination"
import generateWhereClause from "../utils/generate-where-clause"

const prisma = new PrismaClient()

async function createTransaction(data: Transaction) {
  return prisma.transaction.create({ data })
}

async function getTransactionById(id: string) {
  return prisma.transaction.findUnique({ where: { id } })
}

async function getAllTransactions(
  query: z.infer<typeof getAllTransactionsSchema>,
) {
  const { page = "1", limit = "10", sort_key, sort_direction } = query
  const pageNumber = parseInt(page, 10)
  const limitNumber = parseInt(limit, 10)

  const where = generateWhereClause(query)

  const totalCount = await prisma.transaction.count({ where })

  const transactions = await prisma.transaction.findMany({
    take: limitNumber,
    skip: (pageNumber - 1) * limitNumber,
    orderBy: {
      [sort_key || "created_at"]: sort_direction || "desc",
    },
    where,
  })

  return {
    transactions,
    pagination: getPagination(
      { page: pageNumber, limit: limitNumber },
      transactions.length,
      totalCount,
    ),
  }
}

async function updateTransaction(id: string, data: Partial<Transaction>) {
  return prisma.transaction.update({ where: { id }, data })
}

async function deleteTransaction(id: string) {
  return prisma.transaction.delete({ where: { id } })
}

export default {
  createTransaction,
  getTransactionById,
  getAllTransactions,
  updateTransaction,
  deleteTransaction,
}
