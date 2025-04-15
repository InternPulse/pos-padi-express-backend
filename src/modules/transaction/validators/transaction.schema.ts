import { z } from "zod"

export const createTransactionSchema = z.object({
  agent_id: z.string(),
  customer_id: z.string(),
  description: z.string(),
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
  date_from: z.string().optional(),
  date_to: z.string().optional(),
  agent_id: z.union([z.string(), z.array(z.string())]).optional(),
  customer_id: z.union([z.string(), z.array(z.string())]).optional(),
  status: z.string().optional(),
  type: z.string().optional(),
  min_amount: z.string().optional(),
  max_amount: z.string().optional(),
  min_fee: z.string().optional(),
  max_fee: z.string().optional(),
  min_rating: z.string().optional(),
  max_rating: z.string().optional(),
})

export const updateTransactionSchema = z.object({
  customer_id: z.string().optional(),
  amount: z.number().positive().optional(),
  fee: z.number().nonnegative().optional(),
  type: z.string().optional(),
  status: z.string().optional(),
  rating: z.number().optional(),
})
