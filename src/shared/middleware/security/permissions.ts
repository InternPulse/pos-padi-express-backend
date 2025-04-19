import { Request, Response, NextFunction } from "express"
import { Role } from "../../types"

export default function restrictToRoles(roles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role)) {
      res.status(403).json({ success: false, message: "Forbidden" })
      return
    }
    next()
  }
}
