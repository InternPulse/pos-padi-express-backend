import { z } from "zod"

export const createNotificationValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  message: z.string().min(1, "Message is required"),
  userId: z.number().int().positive("User ID must be a positive integer"),
  type: z.string().min(1, "type is required"),
})

export const getNotificationValidationSchema = z.object({
  id: z.string().min(1, "Title is required"),
})

export type CreateNotificationSchema = z.infer<
  typeof createNotificationValidationSchema
>

export type GetNotificationSchema = z.infer<
  typeof getNotificationValidationSchema
>
