import { Request, Response, NextFunction } from "express"
// eslint-disable-next-line import/no-extraneous-dependencies
import jwt from "jsonwebtoken"
import { ReqUser } from "../../types"

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1]

  if (!token) {
    res.status(401).json({ message: "Access denied. No token provided." })
    return
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY as string
    const decoded = jwt.verify(token, secretKey)
    console.log("Decoded JWT:", decoded)
    if (typeof decoded !== "object" || !decoded) {
      res.status(403).json({ message: "Invalid token." })
      return
    }
    if (decoded.token_type.toLowerCase() !== "access") {
      res.status(403).json({ message: "Invalid token type." })
      return
    }
    if (!decoded.user_id || !decoded.company_id) {
      res.status(403).json({ message: "Invalid token." })
      return
    }
    req.user = decoded as ReqUser
    next()
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token." })
  }
}

export default verifyJWT
