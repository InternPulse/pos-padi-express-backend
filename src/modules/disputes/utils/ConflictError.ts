export class ConflictError extends Error {
  statusCode: number

  constructor(message: string) {
    super(message)
    this.name = "ConflictError"
    this.statusCode = 409
    Error.captureStackTrace(this, this.constructor) // ✅ preserves stack
  }

  toString() {
    return `${this.name}: ${this.message}`
  }
}

export default ConflictError
