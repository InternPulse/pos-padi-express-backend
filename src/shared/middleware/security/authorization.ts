import { Request, Response, NextFunction } from "express"
// eslint-disable-next-line import/no-extraneous-dependencies
import jwt from "jsonwebtoken"

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1]

  if (!token) {
    res.status(401).json({ message: "Access denied. No token provided." })
    return
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY as string
    const decoded = jwt.verify(token, secretKey)
    req.user = decoded
    console.log("Secret Key:", decoded)
    next()
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token." })
  }
}

export default verifyJWT
