import { IAPIError } from "./errors"

export interface IAccountCredentials {
  email: string
  password: string
}

export interface IAuthentication {
  expiresAt?: string
  error?: IAPIError
  hasExpired?: boolean
  isValid: boolean
  token?: string
}
