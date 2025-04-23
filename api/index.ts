import serverless from "serverless-http"
import app from "./app"

// This makes Express compatible with Vercel serverless
const handler = serverless(app)
export default handler
