import { addDays } from "date-fns"

interface WhereClause {
  [key: string]: any
}

export default function generateWhereClause(
  filters: Record<string, any>,
): WhereClause {
  const whereClause: WhereClause = {}

  if (filters.dispute_id) {
    if (Array.isArray(filters.dispute_id))
      whereClause.dispute_id = { in: filters.dispute_id }
    else whereClause.dispute_id = filters.dispute_id
  }

  if (filters.transaction_id) {
    if (Array.isArray(filters.transaction_id))
      whereClause.transaction_id = { in: filters.transaction_id }
    else whereClause.transaction_id = filters.transaction_id
  }

  if (filters.status) {
    whereClause.status = filters.status
  }

  if (filters.type) {
    whereClause.type = filters.type
  }

  if (filters.date_from || filters.date_to) {
    whereClause.created_at = {}
  }

  if (filters.date_from) {
    const dateFrom = new Date(filters.date_from)
    if (!Number.isNaN(dateFrom)) whereClause.created_at.gte = dateFrom
  }

  if (filters.date_to) {
    const dateTo = addDays(new Date(filters.date_to), 1)
    if (!Number.isNaN(dateTo)) whereClause.created_at.lt = dateTo
  }

  if (filters.search) {
    whereClause.OR = [
      { description: { contains: filters.search } },
      { type: { contains: filters.search } },
      { status: { contains: filters.search } },
    ]
  }

  return whereClause
}
