import { PrismaClient, Disputes, Prisma } from "@prisma/client"

import { z } from "zod"
import { getAllDisputesSchema } from "../validators/dispute.schema"
import getPagination from "../../../shared/utils/misc/get-pagination"
import generateWhereClause from "../utils/generate-where-clause"
// eslint-disable-next-line import/no-named-as-default
import ConflictError from "../utils/ConflictError"
import ApiError from "../../../shared/utils/ApiError"
import transactionRepo from "../../transaction/repo/transaction.repo"
import { ReqUser } from "../../../shared/types"

const prisma = new PrismaClient()

async function createDisputeRepo(data: Record<string, any>) {
  try {
    const disputeExists = await prisma.disputes.findFirst({
      where: {
        transaction_id: data.transaction_id,
        status: "Pending",
      },
    })
    if (disputeExists) {
      throw new ApiError(
        `A pending dispute with this transaction ID already exists`,
        409,
      )
    }
    const transaction = await prisma.transaction.findUnique({
      where: {
        id: data.transaction_id,
      },
    })

    if (!transaction) {
      throw new ApiError("Transaction not found", 404)
    }

    // eslint-disable-next-line @typescript-eslint/return-await
    return await prisma.disputes.create({
      data: {
        reason: data.reason,
        account_number: data.account_number,
        bank_name: data.bank_name,
        account_name: data.account_name,

        agent_id: transaction.agent_id,
        status: data.status ?? "Pending",
        resolution_notes: data.resolution_notes ?? null,
        is_active: data.is_active ?? true,
        transaction: {
          connect: { id: data.transaction_id },
        },
      },
    })
  } catch (error: any) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const target = error.meta?.target || error.meta?.target
      throw new ConflictError(`A dispute with this ${target} already exists`)
    }

    throw error
  }
}

async function getDisputeById(id: string, user: ReqUser) {
  const where: Record<string, unknown> = {}

  if (user.role === "owner" && user.company_id) {
    const agents = (await prisma.$queryRaw`
    SELECT user_id_id FROM agents_agent WHERE company_id = ${user.company_id}
  `) as Record<string, string>[]

    where.agent_id = { in: agents.map((agent) => agent.user_id_id) }
  }

  if (user.role === "agent" && user.user_id)
    where.agent_id = String(user.user_id)

  const d = await prisma.disputes.findUnique({
    where: { id },
    include: { transaction: true },
  })

  const dispute = { ...d } as Record<string, any>

  const transaction = await transactionRepo.getTransactionById(
    dispute.transaction_id,
    user,
  )

  dispute.transaction = transaction

  return dispute as Disputes
}

async function getAllDisputes(
  query: z.infer<typeof getAllDisputesSchema>,
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

  const totalCount = await prisma.disputes.count({ where })

  const rawDisputes = await prisma.disputes.findMany({
    take: limitNumber,
    skip: (pageNumber - 1) * limitNumber,
    orderBy: {
      [sort_key || "created_at"]: sort_direction || "desc",
    },
    where,
    include: { transaction: true },
  })

  const disputes = await Promise.all(
    rawDisputes.map(async (d) => {
      const dispute = { ...d } as Record<string, any>
      const transaction = await transactionRepo.getTransactionById(
        dispute.transaction_id,
        user,
      )
      dispute.transaction = transaction
      return dispute
    }),
  )

  return {
    disputes,
    pagination: getPagination(
      { page: pageNumber, limit: limitNumber },
      disputes.length,
      totalCount,
    ),
  }
}
async function updateDispute(
  id: string,
  data: Partial<Disputes>,
  user: ReqUser,
) {
  const dispute = await getDisputeById(id, user)
  if (!dispute) return null
  return prisma.disputes.update({
    where: { id },
    data,
    include: { transaction: true },
  })
}
async function deleteDispute(id: string, user: ReqUser) {
  const dispute = await getDisputeById(id, user)
  if (!dispute) return null

  return updateDispute(id, { is_active: false }, user)
}

async function getDisputeStats() {
  const totalDisputes = await prisma.disputes.count()
  const openDisputes = await prisma.disputes.count({
    where: { status: "open" },
  })
  const closedDisputes = await prisma.disputes.count({
    where: { status: "closed" },
  })

  return {
    totalDisputes,
    openDisputes,
    closedDisputes,
  }
}

export {
  createDisputeRepo,
  getDisputeById,
  getAllDisputes,
  updateDispute,
  deleteDispute,
  getDisputeStats,
}
