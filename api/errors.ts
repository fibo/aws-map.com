class APIError extends Error {
  toJSON() {
    return {
      error: {
        code: this.constructor.name,
        message: this.message
      }
    }
  }
}

export class EmailNotFoundError extends APIError {
  constructor() {
    super("Email not found")
  }
}
