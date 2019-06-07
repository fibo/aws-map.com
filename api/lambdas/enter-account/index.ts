import response from "aws-lambda-res"

import { enterAccount } from "../../customerBase"
import {
  EmailNotFoundError,
  EmailNotVerifiedError,
  InvalidPasswordError,
} from "../../errors"
import jsonHeaders from "../../jsonHeaders"

export async function handler(event) {
  const { email, password } = JSON.parse(event.body)

  console.log("email", email)

  try {
    const account = await enterAccount({ email, password })

    return response(202)(account, jsonHeaders)
  } catch (error) {
    console.error(error)

    if (error instanceof InvalidPasswordError) {
      return response(401)(error.toJSON(), jsonHeaders)
    }

    if (error instanceof EmailNotVerifiedError) {
      return response(403)(error.toJSON(), jsonHeaders)
    }

    if (error instanceof EmailNotFoundError) {
      return response(404)(error.toJSON(), jsonHeaders)
    }

    return response(500)(error.toJSON(), jsonHeaders)
  }
}
