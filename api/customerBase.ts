import * as dynamo from "./dynamo"
import * as jsonWebToken from "./jsonWebToken"
import * as passwordPolicy from "./passwordPolicy"
import * as sendEmail from "./sendEmail"

import {
  IAccountCredentials
} from "./account"
import {
  EmailAlreadyRegisteredError,
  EmailNotFoundError,
  EmailNotVerifiedError,
  InternalError,
  InvalidPasswordError,
  MissingParameterError,
} from "./errors"

export function checkEmail(email) {
  if (typeof email !== "string") {
    throw new MissingParameterError()
  }
}

export function checkCredentials(email, password) {
  checkEmail(email)

  if (typeof password !== "string") {
    throw new MissingParameterError()
  }
}

export async function createAccount({ email, password }: IAccountCredentials) {
  checkCredentials(email, password)

  // Check if user email is already registered.
  const emailExists = await dynamo.emailExists(email)

  if (emailExists) {
    throw new EmailAlreadyRegisteredError()
  }

  if (passwordPolicy.isValidPassword(password)) {
    try {
      const { token } = await jsonWebToken.sign({ email })

      const encryptedPassword = passwordPolicy.encryptPassword(password)

      await dynamo.createAccount({
        email,
        encryptedPassword,
      })

      await sendEmail.createAccount(email, token)
    } catch (error) {
      console.error(error)

      throw new InternalError()
    }
  } else {
    throw new InvalidPasswordError()
  }
}

export async function enterAccount({ email, password }: IAccountCredentials) {
  checkCredentials(email, password)

  const user = await dynamo.getUser(email)

  if (user.verified) {
    const encryptedPassword = passwordPolicy.encryptPassword(password)

    if (user.encryptedPassword === encryptedPassword) {
      const { expiresAt, token } = await jsonWebToken.sign({ email })

      return { expiresAt, token, ...user }
    } else {
      throw new InvalidPasswordError()
    }
  } else {
    throw new EmailNotVerifiedError()
  }
}

export async function resetPassword(email) {
  checkEmail(email)

  // Check if user email is actually registered.
  const emailExists = await dynamo.emailExists(email)

  if (emailExists) {
    const password = passwordPolicy.generatePassword()

    const encryptedPassword = passwordPolicy.encryptPassword(password)

    await dynamo.updatePassword(email, encryptedPassword)

    await sendEmail.resetPassword(email, password)
  } else {
    throw new EmailNotFoundError()
  }
}

export async function verifyAccount(token) {
  const { email } = await jsonWebToken.verify(token)

  const emailExists = await dynamo.emailExists(email)

  if (emailExists) {
    await dynamo.verifyEmail(email)
  } else {
    throw new EmailNotFoundError()
  }
}
