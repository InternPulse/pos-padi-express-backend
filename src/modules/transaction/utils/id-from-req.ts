import { Request } from "express"

export function agentIdFromReq(req: Request) {
  if (!req.user || req.user.role !== "agent") return ""
  return req.user.user_id
}

export function companyIdFromReq(req: Request) {
  if (!req.user) return null
  return req.user.company_id
}
