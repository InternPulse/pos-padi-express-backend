import { PrismaClient } from "@prisma/client"

// eslint-disable-next-line import/prefer-default-export
export async function getNotificationUserDetails(
  prisma: PrismaClient,
  userId: string,
) {
  const users = (await prisma.$queryRaw`
    SELECT first_name, last_name FROM users_user WHERE id = ${userId} LIMIT 1
  `) as any[]

  if (users.length) {
    return {
      first_name: users[0].first_name,
      last_name: users[0].last_name,
    }
  }

  return {}
}
