export interface IEmailMessage {
  html: string
  subject: string
  text: string
}

export function createAccountEmail(verificationId: string): IEmailMessage {
  const verificationUrl = `https://api.aws-map.com/v1/verify/${verificationId}`

  return {
    subject: "Welcome to AWS Map",
    html: `
      <h1>Welcome to <em>AWS Map</em>!</h1>
      <br/>
      <p>Please open this link to verify your account: <a href="${verificationUrl}">${verificationUrl}</a></p>
    `,
    text: `
      Welcome to AWS Map!
      Please open this link to verify your account: ${verificationUrl}
    `
  }
}

export function forgotPasswordEmail(password: string): IEmailMessage {
  const enterUrl = "https://aws-map.com/enter"

  return {
    subject: "AWS Map account reset",
    html: `
      <p>Your new <em>AWS Map</em> password is <code>${password}</code></p>
      <br/>
      <p>You can enter from here: <a href="${enterUrl}">${enterUrl}</a></p>
    `,
    text: `
      Your new AWS Map password is ${password}
      You can enter from here: ${enterUrl}
    `
  }
}
