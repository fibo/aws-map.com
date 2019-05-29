import * as AWS from "aws-sdk"

import {
  IEmailMessage,
  createAccountEmail,
  forgotPasswordEmail,
} from "./emailTemplates"

const ses = new AWS.SES({ apiVersion: "2010-12-01", region: "us-east-1" })

/**
 *
 * Sample data passed to callback:
 *
 * {
 *   ResponseMetadata: { RequestId: "a472af4b-1cd2-11e9-b2be-bdd11ee417f6" },
 *   MessageId: "010001686c261df8-b66c028f-d423-44f7-b22e-bb6d1ff9de3c-000000"
 * }
 */
function sendEmail(destination: string, message: IEmailMessage, callback) {
  const Charset = "UTF-8"

  return ses.sendEmail({
    Destination: {
      ToAddresses: [ destination ]
    },
    Message: {
      Body: {
        Html: { Charset, Data: message.html },
        Text: { Charset, Data: message.text }
      },
      Subject: { Charset, Data: message.subject }
    },
    Source: "no-reply@go-seven.com"
  }, callback)
}

export function sendCreateAccountEmail(destinationEmail: string, verificationId: string, callback) {
  const emailMessage = createAccountEmail(verificationId)

  return sendEmail(destinationEmail, emailMessage, callback)
}

export function sendForgotPasswordEmail(destinationEmail: string, password: string, callback) {
  const emailMessage = forgotPasswordEmail(password)

  return sendEmail(destinationEmail, emailMessage, callback)
}
