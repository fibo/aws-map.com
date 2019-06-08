import * as AWS from "aws-sdk"
import no from "not-defined"

import {
  IAccountUser,
} from "./account"
import { region } from "./region"

AWS.config.update({ region })

import {
  EmailNotFoundError
} from "./errors"

const documentClient = new AWS.DynamoDB.DocumentClient()

const service = new AWS.DynamoDB({ apiVersion: "2012-10-08" })

export const tableNamePrefix = "AWSMap"

const UserTableName = `${tableNamePrefix}User`

export function createUserTable() {
  return new Promise((resolve, reject) => {
    service.createTable({
      AttributeDefinitions: [
        { AttributeName: "email", AttributeType: "S" }
      ],
      KeySchema: [
        { AttributeName: "email", KeyType: "HASH" }
      ],
      ProvisionedThroughput: { ReadCapacityUnits: 2, WriteCapacityUnits: 2 },
      StreamSpecification: { StreamEnabled: false },
      TableName: UserTableName
    }, (error, data) => {
      if (error) {
        reject(error)
      } else {
        resolve(data)
      }
    })
  })
}

export function getUser(email): Promise<IAccountUser> {
  return new Promise((resolve, reject) => {
    documentClient.get({
      Key: { email },
      ProjectionExpression: "accountCode, encryptedPassword, settings, verified",
      TableName: UserTableName
    }, (error, data) => {
      if (error) {
        reject(error)
      } else {
        if (no(data)) throw new EmailNotFoundError()

        const {
          encryptedPassword,
          verified,
        } = {
          encryptedPassword: "",
          verified: false,
          ...data.Item
        }

        resolve({
          encryptedPassword,
          verified,
        })
      }
    })
  })
}

export function emailExists(email) {
  return new Promise((resolve, reject) => {
    documentClient.get({
      Key: { email },
      ProjectionExpression: "accountCode",
      TableName: UserTableName
    }, (error, data) => {
      if (error) {
        reject(error)
      } else {
        if (no(data)) resolve(false)
        else resolve(true)
      }
    })
  })
}

export function createAccount({ email, encryptedPassword }) {
  return new Promise((resolve, reject) => {
    const accountCode = new Date().getTime().toString(36) // generates random string

    documentClient.put({
      Item: {
        accountCode,
        email,
        encryptedPassword,
        settings: {},
        verified: false,
      },
      TableName: UserTableName
    }, (error, data) => error ? reject(error) : resolve(data))
  })
}

export function updatePassword(email: string, encryptedPassword: string) {
  return new Promise((resolve, reject) => {
    documentClient.put({
      Item: {
        email,
        encryptedPassword,
      },
      TableName: UserTableName
    }, (error, data) => error ? reject(error) : resolve(data))
  })
}

export function verifyEmail(email: string) {
  return new Promise((resolve, reject) => {
    documentClient.put({
      Item: {
        email,
        verified: true,
      },
      TableName: UserTableName
    }, (error, data) => error ? reject(error) : resolve(data))
  })
}
