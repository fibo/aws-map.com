import response from "aws-lambda-res"

import * as customerBase from "../../customerBase"
import { nakedDomain } from "../../domainNames"

export async function handler(event, context) {
  try {
    const { token } = event.pathParameters

    await customerBase.verifyAccount(token)

    return response(302)(null, { Location: `https://${nakedDomain}` })
  } catch (error) {
    console.error(error)

    return response(200)(
     `<html><body><h1>Could not verify email</h1></body></html>`,
     { "Content-Type": "text/html" }
    )
  }
}
