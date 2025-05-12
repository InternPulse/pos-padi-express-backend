import { PrismaClient, Transaction } from "@prisma/client"
import { z } from "zod"
import { randomUUID } from "crypto"
import { getAllTransactionsSchema } from "../validators/transaction.schema"
import getPagination from "../../../shared/utils/misc/get-pagination"
import generateWhereClause from "../utils/generate-where-clause"
import { TransactionWithAgentCustomer } from "../types"
import { ReqUser } from "../../../shared/types"
import getAgentCustomerDetails from "../utils/get-agent-customer-details"

const prisma = new PrismaClient()

/* 
Creates a new transaction with a random reference (12-char uppercase string).
Assigns the agent_id from the user.
Adds agent and customer details using getAgentCustomerDetails.
Returns the full enriched transaction object. 
*/

async function createTransaction(data: Transaction, user: ReqUser) {
  const reference = randomUUID().replace(/-/g, "").toUpperCase().slice(0, 12)
  const t = await prisma.transaction.create({
    data: { ...data, reference, agent_id: user.user_id },
  })
  const transaction = { ...t } as TransactionWithAgentCustomer

  const { agent, customer } = await getAgentCustomerDetails(
    prisma,
    transaction.agent_id,
    transaction.customer_id,
  )

  transaction.agent = agent
  transaction.customer = customer

  return transaction
}

/*
Retrieves a transaction by ID with access control:
Owner: Can only access transactions of agents within their company.
Agent: Can only access their own transactions.
Uses getAgentCustomerDetails to enrich the response.
*/

async function getTransactionById(id: string, user: ReqUser) {
  const where: Record<string, unknown> = {}

  if (user.role === "owner" && user.company_id) {
    const agents = (await prisma.$queryRaw`
    SELECT user_id_id FROM agents_agent WHERE company_id = ${user.company_id}
  `) as Record<string, string>[]

    where.agent_id = { in: agents.map((agent) => agent.user_id_id) }
  }

  if (user.role === "agent" && user.user_id)
    where.agent_id = String(user.user_id)

  const t = await prisma.transaction.findUnique({ where: { id, ...where } })

  if (!t) return null

  const transaction = { ...t } as TransactionWithAgentCustomer

  const { agent, customer } = await getAgentCustomerDetails(
    prisma,
    transaction.agent_id,
    transaction.customer_id,
  )

  transaction.agent = agent
  transaction.customer = customer

  return transaction as Transaction
}

/*
getAllTransactions(query, user)
Supports:
Pagination (with limit, page)
Sorting (sort_key, sort_direction)
Filtering (via generateWhereClause)
Enforces access control (owner vs agent).
Returns enriched list of transactions + pagination metadata.
*/

async function getAllTransactions(
  query: z.infer<typeof getAllTransactionsSchema>,
  user: ReqUser,
) {
  const agentId = user.user_id
  const companyId = user.company_id

  const { page = "1", limit = "10", sort_key, sort_direction } = query
  const pageNumber = parseInt(page, 10)
  const limitNumber = parseInt(limit, 10)

  const where = generateWhereClause(query)

  if (user.role === "owner" && companyId) {
    const agents = (await prisma.$queryRaw`
      SELECT user_id_id FROM agents_agent WHERE company_id = ${companyId}
    `) as Record<string, string>[]

    const agentIds = agents.map((agent) => agent.user_id_id)

    if (where.agent_id) {
      if (Array.isArray(where.agent_id))
        where.agent_id = where.agent_id.filter((id) => agentIds.includes(id))
      else {
        where.agent_id = agentIds.find((id) => id === where.agent_id)
        if (!where.agent_id) delete where.agent_id
      }
    } else where.agent_id = { in: agentIds }
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

      const { agent, customer } = await getAgentCustomerDetails(
        prisma,
        transaction.agent_id,
        transaction.customer_id,
      )

      transaction.agent = agent
      transaction.customer = customer

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

/*
updateTransaction(id, data, user)
First fetches transaction (with access check).
Updates it if found.
Returns enriched version with agent/customer info.
*/

async function updateTransaction(
  id: string,
  data: Partial<Transaction>,
  user: ReqUser,
) {
  const oldTransaction = await getTransactionById(id, user)
  if (!oldTransaction) return null

  const t = await prisma.transaction.update({ where: { id }, data })
  const transaction = { ...t } as TransactionWithAgentCustomer

  const { agent, customer } = await getAgentCustomerDetails(
    prisma,
    transaction.agent_id,
    transaction.customer_id,
  )

  transaction.agent = agent
  transaction.customer = customer

  return transaction
}

/*
deleteTransaction(id, user)
Performs a soft delete (is_active = false).
Returns enriched deleted transaction, if found.
*/

async function deleteTransaction(id: string, user: ReqUser) {
  let transaction = (await getTransactionById(
    id,
    user,
  )) as TransactionWithAgentCustomer | null
  if (!transaction) return null

  transaction = await updateTransaction(
    id,
    {
      is_active: false,
    },
    user,
  )

  if (!transaction) return null

  const { agent, customer } = await getAgentCustomerDetails(
    prisma,
    transaction.agent_id,
    transaction.customer_id,
  )

  transaction.agent = agent
  transaction.customer = customer

  return transaction
}

/*
getTransactionStats()
Aggregates:
Total amount
Successful/failed amounts
Count of transactions
Total fee (revenue)
Unique agents & customers
Monthly transaction trend (grouped by month)
*/

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
