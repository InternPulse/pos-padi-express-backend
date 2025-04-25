import { Disputes } from "@prisma/client"
import { z } from "zod"
import * as disputeRepo from "../repo/dispute.repo"
import transactionRepo from "../../transaction/repo/transaction.repo"
import {
  createDisputeSchema,
  getAllDisputesSchema,
} from "../validators/dispute.schema"
import NotFoundError from "../../../shared/utils/NotFoundError"

export async function createDispute(data: z.infer<typeof createDisputeSchema>) {
  const transaction = await transactionRepo.getTransactionById(
    data.transaction_id,
  )
  if (!transaction) {
    throw new NotFoundError(
      `Transaction with ID ${data.transaction_id} not found`,
    )
  }

  return disputeRepo.createDisputeRepo(data)
}

export async function getAllDisputes(
  query: z.infer<typeof getAllDisputesSchema>,
) {
  return disputeRepo.getAllDisputes(query)
}

export async function getDisputeById(id: string): Promise<Disputes | null> {
  return disputeRepo.getDisputeById(id)
}

export async function updateDispute(
  id: string,
  data: Partial<z.infer<typeof createDisputeSchema>>,
): Promise<Disputes | null> {
  return disputeRepo.updateDispute(id, data)
}

export async function deleteDispute(id: string) {
  return disputeRepo.deleteDispute(id)
}

export async function getDisputeStats() {
  const totalDisputes = await disputeRepo
    .getAllDisputes({})
    .then((result) => result.pagination.count)

  const rejectedDisputes = await disputeRepo
    .getAllDisputes({ status: "Rejected" })
    .then((result) => result.pagination.count)
  const pendingDisputes = await disputeRepo
    .getAllDisputes({ status: "Pending" })
    .then((result) => result.pagination.count)
  const resolvedDisputes = await disputeRepo
    .getAllDisputes({ status: "Resolved" })
    .then((result) => result.pagination.count)

  return {
    totalDisputes,
    rejectedDisputes,
    pendingDisputes,
    resolvedDisputes,
  }
}
