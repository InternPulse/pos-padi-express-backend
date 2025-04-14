import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

try {
  const res = prisma.sample.findMany({})
  console.log(res)
} catch (e: any) {
  console.log(e.message)
}
