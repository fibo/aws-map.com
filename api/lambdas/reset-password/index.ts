import response from "aws-lambda-res"

import { resetPassword } from "../../customerBase"
import jsonHeaders from "../../jsonHeaders"

export async function handler(event) {
  const { email } = JSON.parse(event.body)

  console.log("email", email)

  try {
    await resetPassword(email)

    return response(202)(null)
  } catch (error) {
    console.error(error)

    return response(400)(error.toJSON(), jsonHeaders)
  }
}
