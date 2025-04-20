import { Request } from "express"

export default function agentIdFromReq(req: Request) {
  if (!req.user || req.user.role !== "agent") return null
  return req.user.agent_id
}
