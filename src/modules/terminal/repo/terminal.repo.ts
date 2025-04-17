import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const TerminalRepository = {
  create: (data: any) => prisma.terminal.create({ data }),

  findAll: () => prisma.terminal.findMany({ include: { agent: true } }),

  findById: (id: string) =>
    prisma.terminal.findUnique({
      where: { id },
      include: { activities: true },
    }),

  update: (id: string, data: any) =>
    prisma.terminal.update({ where: { id }, data }),

  delete: (id: string) => prisma.terminal.delete({ where: { id } }),

  disable: (id: string) =>
    prisma.terminal.update({ where: { id }, data: { status: "DISABLED" } }),
}

export default TerminalRepository
