import { AnyZodObject, ZodError } from "zod"
import { Request, Response, NextFunction, RequestHandler } from "express"

export default function validateRequest(
  schema: AnyZodObject,
  target: "body" | "query" | "params" = "query",
): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.strict().parse(req[target])

      next()
    } catch (error) {
      if (error instanceof ZodError) {
        const e = error.issues
        const errs: string[] = []
        e.forEach((errorObj) => {
          const path = errorObj.path?.[0]
          errs.push(`${errorObj.message}${path ? `: ${path}` : ""}`)
        })
        res.status(400).json({
          message: "bad request",
          success: false,
          errors: errs,
        })
      } else {
        res.status(500).json({
          message: "Internal server error",
          success: false,
        })
      }
    }
  }
}
