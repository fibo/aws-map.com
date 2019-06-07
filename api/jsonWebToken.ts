import * as jwt from "jsonwebtoken"
import no from "not-defined"
import { promisify } from "util"

const jwtSign = promisify(jwt.sign)
const jwtVerify = promisify(jwt.verify)

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

export async function sign(payload: IJwtPayload): Promise<IJwtData> {
  // Set expiration to one month.
  const days = 30
  const expiresIn = 86400 * days

  const expirationDate = new Date()
  expirationDate.setDate(expirationDate.getDate() + days)

  try {
    return await jwtSign(payload, secret, { algorithm, expiresIn })
  } catch (error) {
    throw error
  }
}

export async function verify(token): Promise<IJwtPayload> {
  const payload = await jwtVerify(token, secret, { algorithms: [algorithm] })

  return payload
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
