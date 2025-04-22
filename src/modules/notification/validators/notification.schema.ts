import { z } from "zod"

export const createNotificationValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  message: z.string().min(1, "Message is required"),
  userId: z.string().min(1, "User ID is required"),
  type: z.string().min(1, "type is required"),
  data: z.record(z.unknown()).optional(),
})

export const getNotificationValidationSchema = z.object({
  id: z
    .string({
      required_error: "ID is required",
    })
    .pipe(
      z.coerce
        .number({
          invalid_type_error: "ID must be a number",
        })
        .int("ID must be an integer"),
    ),
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
  id: z
    .string({
      required_error: "ID is required",
    })
    .pipe(
      z.coerce
        .number({
          invalid_type_error: "ID must be a number",
        })
        .int("ID must be an integer"),
    ),
})

export type CreateNotificationSchema = z.infer<
  typeof createNotificationValidationSchema
>

export type GetNotificationSchema = z.infer<
  typeof getNotificationValidationSchema
>
