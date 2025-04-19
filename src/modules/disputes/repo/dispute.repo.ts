import { PrismaClient, Disputes, Prisma } from "@prisma/client"

import { z } from "zod"
import { getAllDisputesSchema } from "../validators/dispute.schema"
import getPagination from "../../../shared/utils/misc/get-pagination"
import generateWhereClause from "../utils/generate-where-clause"
import ConflictError from "../utils/ConflictError"

const prisma = new PrismaClient()

async function createDisputeRepo(data: Disputes) {
  try {
    // eslint-disable-next-line @typescript-eslint/return-await
    return await prisma.disputes.create({ data })
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
  return prisma.disputes.findUnique({ where: { id } })
}
async function getAllDisputes(query: z.infer<typeof getAllDisputesSchema>) {
  const { page = "1", limit = "10", sort_key, sort_direction } = query
  const pageNumber = parseInt(page, 10)
  const limitNumber = parseInt(limit, 10)

  const where = generateWhereClause(query)

  const totalCount = await prisma.disputes.count({ where })

  const disputes = await prisma.disputes.findMany({
    take: limitNumber,
    skip: (pageNumber - 1) * limitNumber,
    orderBy: {
      [sort_key || "created_at"]: sort_direction || "desc",
    },
    where,
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
  return prisma.disputes.update({ where: { id }, data })
}
async function deleteDispute(id: string) {
  let dispute = await getDisputeById(id)
  if (!dispute) return null
  dispute = await updateDispute(id, {
    is_active: false,
  })
  return dispute
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
