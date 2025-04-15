import { z } from "zod"
import { getAllTransactionsSchema } from "../validators/transaction.schema"

export default function generateWhereClause(
  query: z.infer<typeof getAllTransactionsSchema>,
) {
  const { sort_key, sort_direction, search, ...filters } = query

  const where: Record<string, any> = { is_active: true }

  if (filters.agent_id) {
    where.agent_id = filters.agent_id
  }

  if (filters.customer_id) {
    if (Array.isArray(filters.customer_id))
      where.customer_id = { in: filters.customer_id }
    else where.customer_id = filters.customer_id
  }

  if (filters.status) {
    where.status = filters.status
  }

  if (filters.type) {
    where.type = filters.type
  }

  if (filters.min_amount || filters.max_amount) {
    where.amount = {}
    if (filters.min_amount) where.amount.gte = parseFloat(filters.min_amount)
    if (filters.max_amount) where.amount.lte = parseFloat(filters.max_amount)
  }

  if (filters.date_from || filters.date_to) {
    where.created_at = {}
    if (filters.date_from) where.created_at.gte = new Date(filters.date_from)
    if (filters.date_to) where.created_at.lte = new Date(filters.date_to)
  }

  if (search) {
    where.OR = [
      { description: { contains: search } },
      { type: { contains: search } },
      { status: { contains: search } },
    ]
  }

  return where
}
