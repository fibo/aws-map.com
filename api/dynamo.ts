import * as AWS from "aws-sdk"
import no from "not-defined"
import { promisify } from "util"

import { region } from "./region"

AWS.config.update({ region })

import {
  EmailNotFoundError
} from "./errors"

const documentClient = new AWS.DynamoDB.DocumentClient()

const getDocument = promisify(documentClient.get)
const putDocument = promisify(documentClient.put)

const service = new AWS.DynamoDB({ apiVersion: "2012-10-08" })

export const tableNamePrefix = "AWSMap"

const UserTableName = `${tableNamePrefix}User`

function createUserTableWithCallback(callback) {
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
  }, callback)
}

export const createUserTable = promisify(createUserTableWithCallback)

export async function getUser(email) {
  const data = await getDocument({
    Key: { email },
    ProjectionExpression: "accountCode, encryptedPassword, settings, verified",
    TableName: UserTableName
  })

  if (no(data)) {
    throw new EmailNotFoundError()
  }

  return data.Item
}

export async function emailExists(email) {
  const data = documentClient.get({
    Key: { email },
    ProjectionExpression: "accountCode",
    TableName: UserTableName
  })

  if (no(data)) {
    return false
  }

  return true
}

export async function createAccount({ email, encryptedPassword }) {
  const accountCode = new Date().getTime().toString(36) // generates random string

  await documentClient.put({
    Item: {
      accountCode,
      email,
      encryptedPassword,
      settings: {},
      verified: false,
    },
    TableName: UserTableName
  })
}

export async function updatePassword(email: string, encryptedPassword: string) {
  await putDocument({
    Item: {
      email,
      encryptedPassword,
    },
    TableName: UserTableName
  })
}

export async function verifyEmail(email: string) {
  await putDocument({
    Item: {
      email,
      verified: true,
    },
    TableName: UserTableName
  })
}
