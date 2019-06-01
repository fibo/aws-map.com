import * as crypto from "crypto"

export function encryptPassword(password) {
  const algorithm = "sha256"

  const secret = process.env.GOSEVEN_JWT_SECRET

  if (typeof secret === "string") {
    return crypto.createHmac(algorithm, secret).update(password).digest("hex")
  } else {
    return null
  }
}

export function generatePassword() {
  // TODO
  return "Demo123!"
}

export function isValidPassword(password) {
  // TODO
  return true
}
