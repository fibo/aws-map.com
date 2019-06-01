/* tslint:disable max-classes-per-file */

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

export class EmailAlreadyRegisteredError extends APIError {
  constructor() {
    super("Email already registered")
  }
}

export class EmailNotFoundError extends APIError {
  constructor() {
    super("Email not found")
  }
}

export class EmailNotVerifiedError extends APIError {
  constructor() {
    super("Email not verified")
  }
}

export class InternalError extends APIError {
  constructor() {
    super("Internal Error")
  }
}

export class InvalidPasswordError extends APIError {
  constructor() {
    super("Email password")
  }
}

export class MissingAwsAccountIdError extends APIError {
  constructor() {
    super("Missing AWS_ACCOUNT_ID environment variable")
  }
}

export class MissingJwtSecretError extends APIError {
  constructor() {
    super("Missing JWT_SECRET environment variable")
  }
}

export class UnauthorizedError extends APIError {
  constructor() {
    super("Unauthorized")
  }
}
