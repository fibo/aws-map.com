import * as crypto from "crypto"

import {
  MissingJwtSecretError
} from "./errors"

const minLength = 8

const digits = "1234567890"
const lowerCaseAsciiLetters = "abcdefghijklmnopqrstuvwxyz"
const specialChars = ",:;.[]{}()<>=+!@#$%^&-_"
const upperCaseAsciiLetters = lowerCaseAsciiLetters.toUpperCase()

const allChars = digits + lowerCaseAsciiLetters + upperCaseAsciiLetters + specialChars

function randomChar(characters) {
  const position = Math.floor(Math.random() * characters.length)

  return characters.charAt(position)
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5)
}

export function encryptPassword(password) {
  const algorithm = "sha256"

  const secret = process.env.JWT_SECRET

  if (typeof secret === "string") {
    return crypto.createHmac(algorithm, secret).update(password).digest("hex")
  } else {
    throw new MissingJwtSecretError()
  }
}

export function generatePassword() {
  const passwordChars = [
    randomChar(lowerCaseAsciiLetters),
    randomChar(upperCaseAsciiLetters),
    randomChar(digits),
    randomChar(specialChars),
    randomChar(allChars),
    randomChar(allChars),
    randomChar(allChars),
    randomChar(allChars)
  ]

  shuffle(passwordChars)

  return passwordChars.join("")
}

export function isValidPassword(password: string) {
  if (password.length < minLength) {
    return false
  }

  // TODO check if contains digits, lower case and upper case letters, special chars.
  return true
}
