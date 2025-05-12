import { PrismaClient } from "@prisma/client"

/*
Purpose
To retrieve and return:
Agent's first_name and last_name
Customer's first_name and last_name
Given:
agentId
customerId
*/

export default async function getAgentCustomerDetails(
  prisma: PrismaClient,
  agentId: string,
  customerId: string,
) {
  const [agents, customers] = (await prisma.$transaction([
    prisma.$queryRaw`
      SELECT first_name, last_name FROM users_user WHERE id = ${agentId} LIMIT 1
    `,
    prisma.$queryRaw`
      SELECT first_name, last_name FROM customers_customer WHERE id = ${customerId} LIMIT 1
    `,
  ])) as any[]

  return {
    agent: agents.length
      ? { first_name: agents[0].first_name, last_name: agents[0].last_name }
      : {},
    customer: customers.length
      ? {
          first_name: customers[0].first_name,
          last_name: customers[0].last_name,
        }
      : {},
  }
}
