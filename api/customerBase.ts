import * as dynamo from "./dynamo"
import * as jsonWebToken from "./jsonWebToken"
import {
  encryptPassword,
  isValidPassword,
} from "./passwordPolicy"
import * as sendEmail from "./sendEmail"

import {
  EmailAlreadyRegisteredError,
  EmailNotFoundError,
  EmailNotVerifiedError,
  InternalError,
  InvalidPasswordError,
  UnauthorizedError,
} from "./errors"

interface IAccountCredentials {
  email: string
  password: string
}

export async function createAccount({ email, password }: IAccountCredentials) {
  // Check if user email is already registered.
  const emailExists = await dynamo.emailExists(email)

  if (emailExists) {
    throw new EmailAlreadyRegisteredError()
  }

  if (isValidPassword(password)) {
    try {
      const token = await jsonWebToken.sign({ email })

      const encryptedPassword = encryptPassword(password)

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
  const user = await dynamo.getUser(email) || {}

  if (user.verified) {
    const encryptedPassword = encryptPassword(password)

    if (user.encryptedPassword === encryptedPassword) {
      const jwtData = await jsonWebToken.sign({ email })

      return jwtData
    } else {
      throw new InvalidPasswordError()
    }
  } else {
    throw new EmailNotVerifiedError()
  }
}

// export async function resetPassword(email) {
//   // Check if user email is actually registered.
//   const emailExists = await dynamo.emailExists(email)
// }

export async function verifyAccount(token) {
  const { email } = await jsonWebToken.verify(token)

  const emailExists = await dynamo.emailExists(email)

  if (emailExists) {
    await dynamo.verifyEmail(email)
  } else {
    throw new EmailNotFoundError()
  }
}
