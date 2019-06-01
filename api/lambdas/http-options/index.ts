import response from "aws-lambda-res"

import jsonHeaders from "../../jsonHeaders"

export function handler(event, context, callback) {
  const resource = event.resource

  const headersOf = {
    "/account": "Authorization, Content-type",
    "/enter": "Content-type",
    "/reset-password": "Content-type",
    "/verify/:email/:verificationId": "Content-type",
  }

  const methodsOf = {
    "/account": "POST, PUT",
    "/enter": "POST",
    "/reset-password": "POST",
    "/verify/{token}": "GET",
  }

  callback(null, response(200)(null, {
    "Access-Control-Allow-Headers": headersOf[resource],
    "Access-Control-Allow-Methods": `OPTIONS, ${methodsOf[resource]}`,
    "Access-Control-Allow-Origin": jsonHeaders["Access-Control-Allow-Origin"],
  }))
}
