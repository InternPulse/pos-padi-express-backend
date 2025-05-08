import { Transaction } from "@prisma/client"

export interface TransactionWithAgentCustomer extends Transaction {
  agent: Record<string, string>
  customer: Record<string, string>
}
