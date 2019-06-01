import response from "aws-lambda-res"

export async function handler(event, context) {
  response(200)({ ok: true })
}
