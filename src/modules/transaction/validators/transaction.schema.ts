import { z } from "zod"

export const createTransactionSchema = z.object({
  agent_id: z.string(),
  customer_id: z.string(),
  amount: z.number().positive(),
  fee: z.number().nonnegative(),
  type: z.string(),
  status: z.string(),
  rating: z.number().optional(),
})

export const getAllTransactionsSchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  sort_key: z
    .enum([
      "created_at",
      "updated_at",
      "description",
      "amount",
      "fee",
      "type",
      "rating",
      "status",
    ])
    .optional(),
  sort_direction: z.enum(["asc", "desc"]).optional(),
  search: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
})

export const updateTransactionSchema = z.object({
  agent_id: z.string().optional(),
  customer_id: z.string().optional(),
  amount: z.number().positive().optional(),
  fee: z.number().nonnegative().optional(),
  type: z.string().optional(),
  status: z.string().optional(),
  rating: z.number().optional(),
})
