import rateLimit from "express-rate-limit"

const rateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { message: "Too many requests, please try again later." },
  headers: true, // Send `X-RateLimit-*` headers in responses
  standardHeaders: true, // `RateLimit-Limit`, `RateLimit-Remaining`, etc.
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
})

export default rateLimiter
