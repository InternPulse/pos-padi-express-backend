import { z } from "zod"

export const terminalStatusEnum = z.enum(["ACTIVE", "DISABLED"])

export const terminalSchema = z.object({
  name: z.string().min(1),
  agentId: z.string().uuid().optional(),
  status: terminalStatusEnum.optional(),
})

export const terminalUpdateSchema = terminalSchema.partial()
