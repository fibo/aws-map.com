import { apiDomain, nakedDomain } from "./domainNames"

export interface IEmailMessage {
  html: string
  subject: string
  text: string
}

export function createAccountEmail(verificationId: string): IEmailMessage {
  const verificationUrl = `https://${apiDomain}/v1/verify/${verificationId}`

  return {
    html: `
      <h1>Welcome to <em>AWS Map</em>!</h1>
      <br/>
      <p>Please open this link to verify your account: <a href="${verificationUrl}">${verificationUrl}</a></p>
    `,
    subject: "Welcome to AWS Map",
    text: `
      Welcome to AWS Map!
      Please open this link to verify your account: ${verificationUrl}
    `
  }
}

export function forgotPasswordEmail(password: string): IEmailMessage {
  const enterUrl = `https://${nakedDomain}/enter`

  return {
    html: `
      <p>Your new <em>AWS Map</em> password is <code>${password}</code></p>
      <br/>
      <p>You can enter from here: <a href="${enterUrl}">${enterUrl}</a></p>
    `,
    subject: "AWS Map account reset",
    text: `
      Your new AWS Map password is ${password}
      You can enter from here: ${enterUrl}
    `
  }
}
