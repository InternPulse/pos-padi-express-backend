import { PrismaClient, Disputes, Prisma } from "@prisma/client"

import { z } from "zod"
import { getAllDisputesSchema } from "../validators/dispute.schema"
import getPagination from "../../../shared/utils/misc/get-pagination"
import generateWhereClause from "../utils/generate-where-clause"
// eslint-disable-next-line import/no-named-as-default
import ConflictError from "../utils/ConflictError"
import ApiError from "../../../shared/utils/ApiError"

const prisma = new PrismaClient()

async function createDisputeRepo(data: Disputes) {
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
async function getDisputeById(id: string) {
  return prisma.disputes.findUnique({
    where: { id },
    include: { transaction: true },
  })
}
async function getAllDisputes(
  query: z.infer<typeof getAllDisputesSchema>,
  agentId?: string,
) {
  const { page = "1", limit = "10", sort_key, sort_direction } = query
  const pageNumber = parseInt(page, 10)
  const limitNumber = parseInt(limit, 10)

  const where = generateWhereClause(query)
  if (agentId) where.agent_id = String(agentId)

  const totalCount = await prisma.disputes.count({ where })

  const disputes = await prisma.disputes.findMany({
    take: limitNumber,
    skip: (pageNumber - 1) * limitNumber,
    orderBy: {
      [sort_key || "created_at"]: sort_direction || "desc",
    },
    where,
    include: { transaction: true },
  })

  return {
    disputes,
    pagination: getPagination(
      { page: pageNumber, limit: limitNumber },
      disputes.length,
      totalCount,
    ),
  }
}
async function updateDispute(id: string, data: Partial<Disputes>) {
  const dispute = await getDisputeById(id)
  if (!dispute) return null
  return prisma.disputes.update({
    where: { id },
    data,
    include: { transaction: true },
  })
}
async function deleteDispute(id: string) {
  const dispute = await getDisputeById(id)
  if (!dispute) return null

  return updateDispute(id, { is_active: false })
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
