import * as jwt from "jsonwebtoken"
import no from "not-defined"

import {
  MissingJwtSecretError,
  UnauthorizedError,
} from "./errors"

interface IJwtData {
  expiresAt: string
  token: string
}

interface IJwtPayload {
  email: string
}

const algorithm = "HS256"

const secret = process.env.JWT_SECRET

if (no(secret)) {
  throw new MissingJwtSecretError()
}

export function sign(payload: IJwtPayload): Promise<IJwtData> {
  return new Promise((resolve, reject) => {
    // Set expiration to one month.
    const days = 30
    const expiresIn = 86400 * days

    const expirationDate = new Date()
    expirationDate.setDate(expirationDate.getDate() + days)
    const expiresAt = expirationDate.toISOString()

    jwt.sign(payload, secret, { algorithm, expiresIn }, (error, token) => {
      if (error) {
        reject(error)
      } else {
        resolve({
          expiresAt,
          token,
        })
      }
    })
  })
}

export function verify(token): Promise<IJwtPayload> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, { algorithms: [algorithm] }, (error, data) => error ? reject(error) : resolve(data))
  })
}

export async function verifyHeaders({ Authorization }) {
  if (typeof Authorization === "string" && Authorization.startsWith("BEARER ")) {
    const token = Authorization.substring(7)

    const payload = await verify(token)

    return payload
  } else {
    throw new UnauthorizedError()
  }
}
