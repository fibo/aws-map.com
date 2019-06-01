import {
  getUser
} from "./dynamo"

import {
  sendResetPasswordEmail
} from "./sendEmail"

interface IAccountCredentials {
  email: string
  password: string
}

export function createAccount({ email, password }: IAccountCredentials, callback) {
  // Check if user email is already registered.
  // getUser(email, (error) => {

  // })
}

export function enterAccount({ email, password }: IAccountCredentials, callback) {
  // getUser(email, (error, user) => {

  // })
}

export function resetPassword(email) {
  // Check if user email is actually registered.
  // getUser(email, (error) => {
  //   sendResetPasswordEmail(email)
  // })
}

export function verifyEmail() {
}
