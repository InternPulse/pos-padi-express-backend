import { PrismaClient, Transaction } from "@prisma/client"
import { z } from "zod"
import { randomUUID } from "crypto"
import { getAllTransactionsSchema } from "../validators/transaction.schema"
import getPagination from "../../../shared/utils/misc/get-pagination"
import generateWhereClause from "../utils/generate-where-clause"

const prisma = new PrismaClient()

async function createTransaction(data: Transaction) {
  const reference = randomUUID().replace(/-/g, "").toUpperCase().slice(0, 12)
  return prisma.transaction.create({ data: { ...data, reference } })
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
  const transaction = await getTransactionById(id)
  if (!transaction) return null
  return prisma.transaction.update({ where: { id }, data })
}

async function deleteTransaction(id: string) {
  let transaction = await getTransactionById(id)
  if (!transaction) return null
  transaction = await updateTransaction(id, {
    is_active: false,
  })
  return transaction
}

async function getTransactionStats() {
  const [
    totalAmount,
    successfulAmount,
    failedAmount,
    totalCount,
    totalRevenue,
    agents,
    customers,
    monthlyTrend,
  ] = await Promise.all([
    prisma.transaction.aggregate({
      _sum: { amount: true },
    }),
    prisma.transaction.aggregate({
      _sum: { amount: true },
      where: { status: "SUCCESSFUL", is_active: true },
    }),
    prisma.transaction.aggregate({
      _sum: { amount: true },
      where: { status: "FAILED", is_active: true },
    }),
    prisma.transaction.count({ where: { is_active: true } }),
    prisma.transaction.aggregate({
      _sum: { fee: true },
      where: { is_active: true },
    }),
    prisma.transaction.findMany({
      distinct: ["agent_id"],
      select: { agent_id: true },
      where: { is_active: true },
    }),
    prisma.transaction.findMany({
      distinct: ["customer_id"],
      select: { customer_id: true },
      where: { is_active: true },
    }),
    prisma.$queryRaw`
      SELECT DATE_FORMAT(created_at, '%Y-%m') as month, COUNT(*) as count
      FROM Transaction
      WHERE is_active = true
      GROUP BY month
      ORDER BY month
    `,
  ])

  return {
    totalAmount: totalAmount._sum.amount || 0,
    successfulAmount: successfulAmount._sum.amount || 0,
    failedAmount: failedAmount._sum.amount || 0,
    totalCount,
    totalRevenue: totalRevenue._sum.fee || 0,
    totalAgents: agents.length,
    totalCustomers: customers.length,
    monthlyTrend: (monthlyTrend as any[]).map((entry: any) => ({
      ...entry,
      count: Number(entry.count),
    })),
  }
}

async function getAgentTransactionStats(agentId: string) {
  const [
    totalAmount,
    successAmount,
    failedAmount,
    totalCount,
    customers,
    monthlyTrend,
  ] = await Promise.all([
    prisma.transaction.aggregate({
      _sum: { amount: true },
      where: { agent_id: agentId, is_active: true },
    }),
    prisma.transaction.aggregate({
      _sum: { amount: true },
      where: { agent_id: agentId, status: "SUCCESS", is_active: true },
    }),
    prisma.transaction.aggregate({
      _sum: { amount: true },
      where: { agent_id: agentId, status: "FAILED", is_active: true },
    }),
    prisma.transaction.count({
      where: { agent_id: agentId, is_active: true },
    }),
    prisma.transaction.findMany({
      distinct: ["customer_id"],
      select: { customer_id: true },
      where: { agent_id: agentId, is_active: true },
    }),
    prisma.$queryRaw`
      SELECT DATE_FORMAT(created_at, '%Y-%m') as month, COUNT(*) as count
      FROM Transaction
      WHERE agent_id = ${agentId} AND is_active = true
      GROUP BY month
      ORDER BY month
    `,
  ])

  return {
    totalAmount: totalAmount._sum.amount || 0,
    successAmount: successAmount._sum.amount || 0,
    failedAmount: failedAmount._sum.amount || 0,
    totalCount,
    totalCustomers: customers.length,
    monthlyTrend: (monthlyTrend as any[]).map((entry: any) => ({
      ...entry,
      count: Number(entry.count),
    })),
  }
}

export default {
  createTransaction,
  getTransactionById,
  getAllTransactions,
  updateTransaction,
  deleteTransaction,
  getTransactionStats,
  getAgentTransactionStats,
}
