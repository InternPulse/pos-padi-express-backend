import { z } from "zod"

export const createNotificationValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  message: z.string().min(1, "Message is required"),
  user_id: z.string().min(1, "User ID is required"),
  type: z.string().min(1, "type is required"),
  data: z.record(z.unknown()).optional(),
})

export const getNotificationValidationSchema = z.object({
  id: z.string({
    required_error: "Notification ID is required",
    invalid_type_error: "Notification ID must be a string",
  }),
})

export const getNotificationsValidationSchema = z.object({
  page: z
    .string({
      required_error: "Page is required",
      invalid_type_error: "Page must be a string",
    })
    .pipe(
      z.coerce
        .number({
          invalid_type_error: "Page must be a number",
        })
        .min(1, "Page must be greater than 0"),
    )
    .optional(),

  limit: z
    .string({
      required_error: "Limit is required",
      invalid_type_error: "Limit must be a string",
    })
    .pipe(
      z.coerce
        .number({
          invalid_type_error: "Limit must be a number",
        })
        .min(1, "Limit must be greater than 0"),
    )
    .optional(),
})

export const markNotificationAsReadValidationSchema = z.object({
  id: z.string({
    required_error: "ID is required",
    invalid_type_error: " Notification ID must be a string",
  }),
})

export type CreateNotificationSchema = z.infer<
  typeof createNotificationValidationSchema
>

export type GetNotificationSchema = z.infer<
  typeof getNotificationValidationSchema
>
