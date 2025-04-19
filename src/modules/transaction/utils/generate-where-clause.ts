import { z } from "zod"
import { addDays } from "date-fns"
import { getAllTransactionsSchema } from "../validators/transaction.schema"

export default function generateWhereClause(
  query: z.infer<typeof getAllTransactionsSchema>,
) {
  const { sort_key, sort_direction, search, ...filters } = query

  const where: Record<string, any> = { is_active: true }

  if (filters.agent_id) {
    if (Array.isArray(filters.agent_id))
      where.agent_id = { in: filters.agent_id }
    else where.agent_id = filters.agent_id
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

  if (filters.min_fee || filters.max_fee) {
    where.fee = {}
    if (filters.min_fee) where.fee.gte = parseFloat(filters.min_fee)
    if (filters.max_fee) where.fee.lte = parseFloat(filters.max_fee)
  }

  if (filters.min_rating || filters.max_rating) {
    where.rating = {}
    if (filters.min_rating) where.rating.gte = parseFloat(filters.min_rating)
    if (filters.max_rating) where.rating.lte = parseFloat(filters.max_rating)
  }

  if (filters.date_from || filters.date_to) {
    where.created_at = {}
  }

  if (filters.date_from) {
    const dateFrom = new Date(filters.date_from)
    if (!Number.isNaN(dateFrom)) where.created_at.gte = dateFrom
  }

  if (filters.date_to) {
    const dateTo = addDays(new Date(filters.date_to), 1)
    if (!Number.isNaN(dateTo)) where.created_at.lt = dateTo
  }

  if (search) {
    where.OR = [
      { description: { contains: search } },
      { type: { contains: search } },
      { status: { contains: search } },
      { reference: { contains: search } },
    ]
  }

  return where
}
