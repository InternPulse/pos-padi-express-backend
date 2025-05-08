import { z } from "zod"
import crypto from "crypto"

export const createDisputeSchema = z.object({
  id: z
    .string()
    .uuid()
    .default(() => crypto.randomUUID()),
  transaction_id: z.string().uuid(),
  status: z.enum(["Pending", "Resolved", "Rejected"]).default("Pending"),
  resolution_notes: z.string().nullable().default(null),
  account_number: z.string().nullable(),
  account_name: z.string().nullable().default(null),
  reason: z.string().nullable(),
  bank_name: z.string().nullable(),
  created_at: z.date().default(() => new Date()),
  updated_at: z.date().default(() => new Date()),
  // user_id: z.string().nullable(),
  is_active: z.boolean().default(true),
  agent_id: z.string().nullable().default(null),
})

export const getAllDisputesSchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  sort_key: z
    .enum(["created_at", "updated_at", "status", "is_active"])
    .optional(),
  sort_direction: z.enum(["asc", "desc"]).optional(),
  search: z.string().optional(),
  date_from: z.string().optional(),
  date_to: z.string().optional(),
  transaction_id: z.union([z.string(), z.array(z.string())]).optional(),
  status: z.enum(["Pending", "Resolved", "Rejected"]).optional(),
  is_active: z.boolean().optional(),
})

export const updateDisputeSchema = z.object({
  status: z.enum(["Pending", "Resolved", "Rejected"]).optional(),
  resolution_notes: z.string().nullable().optional(),
  updated_at: z.date().default(() => new Date()),
  is_active: z.boolean().optional(),
})
