import { Request, Response } from "express"
import TerminalService from "../services/terminal.service"

const TerminalController = {
  register: async (req: Request, res: Response) => {
    const terminal = await TerminalService.registerTerminal(req.body)
    res.status(201).json(terminal)
  },
  list: async (_req: Request, res: Response) => {
    const terminals = await TerminalService.getAllTerminals()
    res.json(terminals)
  },
  detail: async (req: Request, res: Response) => {
    const terminal = await TerminalService.getTerminalById(req.params.id)
    res.json(terminal)
  },
  update: async (req: Request, res: Response) => {
    const terminal = await TerminalService.updateTerminal(
      req.params.id,
      req.body,
    )
    res.json(terminal)
  },
  remove: async (req: Request, res: Response) => {
    await TerminalService.deleteTerminal(req.params.id)
    res.status(204).send()
  },
  disable: async (req: Request, res: Response) => {
    const terminal = await TerminalService.disableTerminal(req.params.id)
    res.json(terminal)
  },
}

export default TerminalController
