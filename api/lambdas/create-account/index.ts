import response from "aws-lambda-res"

import { createAccount } from "../../customerBase"
import jsonHeaders from "../../jsonHeaders"

export async function handler(event) {
  const { email, password } = JSON.parse(event.body)

  console.log("email", email)

  try {
    await createAccount({ email, password })
  } catch (error) {
    console.error(error)

    return response(400)(error.toJSON(), jsonHeaders)
  }

  console.log("Account created.", `email=${email}`)

  return response(201)(null, jsonHeaders)
}
