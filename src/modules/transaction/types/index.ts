import { Transaction } from "@prisma/client"

export interface TransactionWithAgentCustomer extends Transaction {
  agent: Record<string, unknown>
  customer: Record<string, unknown>
}
