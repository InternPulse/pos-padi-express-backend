export class NotFoundError extends Error {
  statusCode: number

  constructor(message: string) {
    super(message)
    this.name = "NotFoundError"
    this.statusCode = 404
    this.message = message || "Resource not found"
    Object.setPrototypeOf(this, NotFoundError.prototype)
  }

  toString() {
    return `${this.name}: ${this.message}`
  }
}

export default NotFoundError
