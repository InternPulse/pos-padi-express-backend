import { Transaction } from "@prisma/client"

/*
Defines a new interface called TransactionWithAgentCustomer.
It extends the existing Transaction type, meaning it inherits all the fields from it.
It adds two new properties:
agent: A generic object (containing agent details).
customer: A generic object containing customer details.
*/

export interface TransactionWithAgentCustomer extends Transaction {
  agent: Record<string, unknown>
  customer: Record<string, unknown>
}

/*
Why Is This Useful?
In the base Transaction, we only have agent_id and customer_id.
This interface allows us to include full agent and customer information (e.g., name, email) along with the transaction.
It's used for response objects where related data is joined or attached.
*/
