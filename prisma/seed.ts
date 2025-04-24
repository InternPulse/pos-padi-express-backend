import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

function generateRandomTransactions(count: number) {
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

  const transactions = []

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < count; i += 1) {
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

const generateDisputes = (count: number) => {
  const disputes = []
  const statuses = ["Pending", "Resolved", "Rejected"]
  const resolutions = [
    "Refunded",
    "Resolved with no action",
    "Resolved with partial refund",
    "Rejected",
  ]
  for (let i = 0; i < count; i += 1) {
    const dispute = {
      id: crypto.randomUUID(),
      transaction_id: `TXN-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      resolution_notes:
        resolutions[Math.floor(Math.random() * resolutions.length)],
      created_at: new Date(),
      updated_at: new Date(),
      is_active: true,
    }
    disputes.push(dispute)
    // Save the dispute to the database
  }
  return disputes
}

async function main() {
  const transactions = generateRandomTransactions(100)
  const disputes = generateDisputes(100)

  await prisma.transaction.createMany({
    data: transactions,
  })
  await prisma.disputes.createMany({
    data: disputes,
  })
  console.log("Seeded 100 transactions and 100 disputes successfully!")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
