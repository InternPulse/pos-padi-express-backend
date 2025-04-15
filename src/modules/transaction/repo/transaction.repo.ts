import { PrismaClient, Transaction } from "@prisma/client"

const prisma = new PrismaClient()

async function createTransaction(data: Transaction) {
  return prisma.transaction.create({ data })
}

async function getTransactionById(id: string) {
  return prisma.transaction.findUnique({ where: { id } })
}

async function getAllTransactions() {
  return prisma.transaction.findMany()
}

async function updateTransaction(id: string, data: Partial<Transaction>) {
  return prisma.transaction.update({ where: { id }, data })
}

async function deleteTransaction(id: string) {
  return prisma.transaction.delete({ where: { id } })
}

export default {
  createTransaction,
  getTransactionById,
  getAllTransactions,
  updateTransaction,
  deleteTransaction,
}
