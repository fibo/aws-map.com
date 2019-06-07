import * as AWS from "aws-sdk"
import { promisify } from "util"

import { nakedDomain } from "./domainNames"
import { region } from "./region"

import {
  createAccountEmail,
  resetPasswordEmail,
  IEmailMessage,
} from "./emailTemplates"

const ses = new AWS.SES({ apiVersion: "2010-12-01", region })

/**
 *
 * Sample data passed to callback:
 *
 * {
 *   ResponseMetadata: { RequestId: "a472af4b-1cd2-11e9-b2be-bdd11ee417f6" },
 *   MessageId: "010001686c261df8-b66c028f-d423-44f7-b22e-bb6d1ff9de3c-000000"
 * }
 */
function sendEmailWithCallback(destination: string, message: IEmailMessage, callback) {
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
    Source: `no-reply@${nakedDomain}`
  }, callback)
}

const sendEmail = promisify(sendEmailWithCallback)

export async function createAccount(destinationEmail: string, token: string) {
  const emailMessage = createAccountEmail(token)

  await sendEmail(destinationEmail, emailMessage)
}

export async function resetPassword(destinationEmail: string, password: string) {
  const emailMessage = resetPasswordEmail(password)

  await sendEmail(destinationEmail, emailMessage)
}
