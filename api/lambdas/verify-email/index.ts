import response from "aws-lambda-res"

export async function handler(event, context) {
  return response(200)({ ok: true })
}
