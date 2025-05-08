import { PrismaClient, Transaction } from "@prisma/client"
import { z } from "zod"
import { randomUUID } from "crypto"
import { getAllTransactionsSchema } from "../validators/transaction.schema"
import getPagination from "../../../shared/utils/misc/get-pagination"
import generateWhereClause from "../utils/generate-where-clause"
import { TransactionWithAgentCustomer } from "../types"
import { ReqUser } from "../../../shared/types"

const prisma = new PrismaClient()

async function createTransaction(data: Transaction, user: ReqUser) {
  const reference = randomUUID().replace(/-/g, "").toUpperCase().slice(0, 12)
  return prisma.transaction.create({
    data: { ...data, reference, agent_id: user.user_id },
  })
}

async function getTransactionById(id: string, user: ReqUser) {
  const where: Record<string, unknown> = {}

  if (user.role === "owner" && user.company_id) {
    const agents = (await prisma.$queryRaw`
    SELECT user_id_id FROM agents_agent WHERE company_id = ${user.company_id}
  `) as Record<string, string>[]

    if (agents && agents.length > 0)
      where.agent_id = { in: agents.map((agent) => agent.user_id_id) }
  }

  const transaction = prisma.transaction.findUnique({ where: { id, ...where } })

  return transaction
}

async function getAllTransactions(
  query: z.infer<typeof getAllTransactionsSchema>,
  user: ReqUser,
) {
  const agentId = user.agent_id
  const companyId = user.company_id

  const { page = "1", limit = "10", sort_key, sort_direction } = query
  const pageNumber = parseInt(page, 10)
  const limitNumber = parseInt(limit, 10)

  const where = generateWhereClause(query)

  if (user.role === "owner" && companyId) {
    const agents = (await prisma.$queryRaw`
    SELECT user_id_id FROM agents_agent WHERE company_id = ${companyId}
  `) as Record<string, string>[]

    if (agents && agents.length > 0)
      where.agent_id = { in: agents.map((agent) => agent.user_id_id) }
  }

  if (user.role === "agent" && agentId) where.agent_id = String(agentId)

  const totalCount = await prisma.transaction.count({ where })

  const rawTransactions = await prisma.transaction.findMany({
    take: limitNumber,
    skip: (pageNumber - 1) * limitNumber,
    orderBy: {
      [sort_key || "created_at"]: sort_direction || "desc",
    },
    where,
  })

  const transactions = await Promise.all(
    rawTransactions.map(async (t) => {
      const transaction = { ...t } as TransactionWithAgentCustomer

      const [agent] = (await prisma.$queryRaw`
      SELECT * FROM users_user WHERE id = ${transaction.agent_id} LIMIT 1
    `) as any[]
      const [customer] = (await prisma.$queryRaw`
      SELECT * FROM customers_customer WHERE id = ${transaction.customer_id} LIMIT 1
    `) as any[]

      transaction.agent = agent
        ? { first_name: agent.first_name, last_name: agent.last_name }
        : {}

      transaction.customer = customer
        ? { first_name: customer.first_name, last_name: customer.last_name }
        : {}

      return transaction
    }),
  )

  return {
    transactions,
    pagination: getPagination(
      { page: pageNumber, limit: limitNumber },
      transactions.length,
      totalCount,
    ),
  }
}

async function updateTransaction(
  id: string,
  data: Partial<Transaction>,
  user: ReqUser,
) {
  const transaction = await getTransactionById(id, user)
  if (!transaction) return null
  return prisma.transaction.update({ where: { id }, data })
}

async function deleteTransaction(id: string, user: ReqUser) {
  let transaction = await getTransactionById(id, user)
  if (!transaction) return null
  transaction = await updateTransaction(
    id,
    {
      is_active: false,
    },
    user,
  )
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
      FROM transactions
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
      FROM transactions
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
