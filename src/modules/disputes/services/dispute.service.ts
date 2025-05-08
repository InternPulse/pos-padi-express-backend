import { Disputes } from "@prisma/client"
import { z } from "zod"
import * as disputeRepo from "../repo/dispute.repo"
import transactionRepo from "../../transaction/repo/transaction.repo"
import {
  createDisputeSchema,
  getAllDisputesSchema,
} from "../validators/dispute.schema"
// eslint-disable-next-line import/no-named-as-default
import NotFoundError from "../../../shared/utils/NotFoundError"
import { ReqUser } from "../../../shared/types"

type CreateDisputeInput = z.infer<typeof createDisputeSchema> & {
  agent_id: string
}

export async function createDispute(
  data: z.infer<typeof createDisputeSchema>,
  user: ReqUser,
) {
  const transaction = await transactionRepo.getTransactionById(
    data.transaction_id,
    user,
  )
  if (!transaction) {
    throw new NotFoundError(
      `Transaction with ID ${data.transaction_id} not found`,
    )
  }

  const input: CreateDisputeInput = {
    ...data,
    agent_id: transaction.agent_id,
  }

  return disputeRepo.createDisputeRepo(input)
}

export async function getAllDisputes(
  query: z.infer<typeof getAllDisputesSchema>,
  agentId?: string,
) {
  return disputeRepo.getAllDisputes(query, agentId)
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

export async function deleteDispute(id: string): Promise<Disputes | null> {
  return disputeRepo.deleteDispute(id)
}

// export async function getDisputeStats() {
//   const totalDisputes = await disputeRepo
//     .getAllDisputes({})
//     .then((result) => result.pagination.count)

//   const rejectedDisputes = await disputeRepo
//     .getAllDisputes({ status: "Rejected" })
//     .then((result) => result.pagination.count)
//   const pendingDisputes = await disputeRepo
//     .getAllDisputes({ status: "Pending" })
//     .then((result) => result.pagination.count)
//   const resolvedDisputes = await disputeRepo
//     .getAllDisputes({ status: "Resolved" })
//     .then((result) => result.pagination.count)

//   return {
//     totalDisputes,
//     rejectedDisputes,
//     pendingDisputes,
//     resolvedDisputes,
//   }
// }
