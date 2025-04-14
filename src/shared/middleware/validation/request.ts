import { AnyZodObject } from "zod"
import { Request, Response, NextFunction, RequestHandler } from "express"

export default function validateRequest(schema: AnyZodObject): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    })

    if (!result.success) {
      const e = result.error.issues
      const errs: string[] = []
      e.forEach((errorObj) => {
        errs.push(errorObj.message)
      })
      res.status(400).json({
        message: "bad request",
        success: false,
        errors: errs,
      })
      return
    }

    next()
  }
}
