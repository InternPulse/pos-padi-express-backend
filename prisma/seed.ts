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
  for (let i = 0; i < count; i++) {
    transactions.push({
      agent_id: agents[Math.floor(Math.random() * agents.length)],
      customer_id: customers[Math.floor(Math.random() * customers.length)],
      description:
        descriptions[Math.floor(Math.random() * descriptions.length)],
      amount: parseFloat((Math.random() * 1000).toFixed(2)),
      fee: parseFloat((Math.random() * 10).toFixed(2)),
      type: types[Math.floor(Math.random() * types.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      rating: ratings[Math.floor(Math.random() * ratings.length)],
    })
  }

  return transactions
}

async function main() {
  const transactions = generateRandomTransactions(100)

  await prisma.transaction.createMany({
    data: transactions,
  })

  console.log("Seeded 100 transactions successfully!")
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
