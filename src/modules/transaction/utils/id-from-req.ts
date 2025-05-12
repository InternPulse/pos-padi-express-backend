import { Request } from "express"

/*
agentIdFromReq
What it does:
Checks if the req.user object exists and the user's role is "agent".
If true, returns the user's ID (user_id).
If not, returns an empty string.
*/
export function agentIdFromReq(req: Request) {
  if (!req.user || req.user.role !== "agent") return ""
  return req.user.user_id
}

/*
companyIdFromReq
What it does:
Checks if the user is authenticated (req.user exists).
If yes, returns the associated company_id.
If not, returns null.
*/
export function companyIdFromReq(req: Request) {
  if (!req.user) return null
  return req.user.company_id
}
