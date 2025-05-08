export type Role = "owner" | "agent" | "customer"

export interface ReqUser {
  user_id: string
  role: Role
  company_id: string
  agent_id?: string
}
