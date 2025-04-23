import serverless from "serverless-http"
import app from "./app"

// This makes Express compatible with Vercel serverless
export const handler = serverless(app)
