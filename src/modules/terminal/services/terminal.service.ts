import TerminalRepository from "../repo/terminal.repo"

const TerminalService = {
  registerTerminal: (data: any) => TerminalRepository.create(data),
  getAllTerminals: () => TerminalRepository.findAll(),
  getTerminalById: (id: string) => TerminalRepository.findById(id),
  updateTerminal: (id: string, data: any) =>
    TerminalRepository.update(id, data),
  deleteTerminal: (id: string) => TerminalRepository.delete(id),
  disableTerminal: (id: string) => TerminalRepository.disable(id),
}

export default TerminalService
