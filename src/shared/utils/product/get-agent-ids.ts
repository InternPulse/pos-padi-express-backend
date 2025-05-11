import { PrismaClient } from "@prisma/client"

export default async function getAgentIdsInCompany(
  prisma: PrismaClient,
  companyId: string,
) {
  const agents = (await prisma.$queryRaw`
    SELECT user_id_id FROM agents_agent WHERE company_id = ${companyId}
  `) as Record<string, string>[]

  return agents.map((agent) => agent.user_id_id)
}
