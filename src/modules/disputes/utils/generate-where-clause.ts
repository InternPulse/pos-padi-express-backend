import { addDays } from "date-fns"
import { z } from "zod"
import { getAllDisputesSchema } from "../validators/dispute.schema"

export default function generateDisputeWhereClasuse(
  query: z.infer<typeof getAllDisputesSchema>,
) {
  const { sort_key, sort_direction, search, ...filters } = query
  const whereClause: Record<string, any> = {}

  if (filters.transaction_id) {
    if (Array.isArray(filters.transaction_id)) {
      whereClause.transaction_id = { in: filters.transaction_id }
    } else if (
      typeof filters.transaction_id === "string" &&
      filters.transaction_id.includes(",")
    ) {
      whereClause.transaction_id = {
        in: filters.transaction_id.split(",").map((id) => id.trim()),
      }
    } else {
      whereClause.transaction_id = filters.transaction_id
    }
  }

  if (filters.status) {
    whereClause.status = filters.status
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

  if (search) {
    whereClause.OR = [
      { resolution_notes: { contains: search } },
      { transaction_id: { contains: search } },
      { status: { contains: search } },
    ]
  }

  return whereClause
}
