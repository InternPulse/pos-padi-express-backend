import { Prisma, PrismaClient } from "@prisma/client"
import crypto from "crypto"

const prisma = new PrismaClient()

function generateRandomTransactions(
  count: number,
): Prisma.TransactionCreateInput[] {
  const agents = ["agent1", "agent2", "agent3", "agent4", "agent5"]
  const customers = [
    "customer1",
    "customer2",
    "customer3",
    "customer4",
    "customer5",
  ]
  const descriptions = [
    "send to Kola",
    "send to Dada",
    "send to Bayo",
    "send to Tunde",
    "send to Sola",
  ]
  const types = ["credit", "debit"]
  const statuses = ["completed", "pending", "failed"]
  const ratings = [1, 2, 3, 4, 5]

  const transactions: Prisma.TransactionCreateInput[] = []

  for (let i = 0; i < count; i++) {
    transactions.push({
      agent_id: agents[Math.floor(Math.random() * agents.length)],
      customer_id: customers[Math.floor(Math.random() * customers.length)],
      description:
        descriptions[Math.floor(Math.random() * descriptions.length)],
      reference: `TXN-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      amount: parseFloat((Math.random() * 1000).toFixed(2)),
      fee: parseFloat((Math.random() * 10).toFixed(2)),
      type: types[Math.floor(Math.random() * types.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      rating: ratings[Math.floor(Math.random() * ratings.length)],
    })
  }

  return transactions
}

function generateDisputes(
  transactions: { id: string }[],
): Prisma.DisputesCreateInput[] {
  const statuses = ["Pending", "Resolved", "Rejected"]
  const resolutions = [
    "Refunded",
    "Resolved with no action",
    "Resolved with partial refund",
    "Rejected",
  ]
  const disputes: Prisma.DisputesCreateInput[] = []

  // eslint-disable-next-line no-restricted-syntax
  for (const tx of transactions) {
    if (Math.random() < 0.5) {
      disputes.push({
        id: crypto.randomUUID(),
        transaction: {
          connect: { id: tx.id },
        },
        status: statuses[Math.floor(Math.random() * statuses.length)],
        resolution_notes:
          resolutions[Math.floor(Math.random() * resolutions.length)],
        created_at: new Date(),
        updated_at: new Date(),
        is_active: true,
      })
    }
  }

  return disputes
}

async function main() {
  const transactionsData = generateRandomTransactions(100)

  // Use create (not createMany) to retain access to inserted IDs
  const createdTransactions = await Promise.all(
    transactionsData.map((tx) => prisma.transaction.create({ data: tx })),
  )

  const disputesData = generateDisputes(createdTransactions)

  // eslint-disable-next-line no-restricted-syntax
  for (const dispute of disputesData) {
    // eslint-disable-next-line no-await-in-loop
    await prisma.disputes.create({ data: dispute })
  }

  console.log(
    `Seeded ${createdTransactions.length} transactions and ${disputesData.length} disputes successfully!`,
  )
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
