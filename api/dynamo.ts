import * as AWS from "aws-sdk"
import no from "not-defined"

import { region } from "./region"

AWS.config.update({ region })

import {
  EmailNotFoundError
} from "./errors"

const documentClient = new AWS.DynamoDB.DocumentClient()

const service = new AWS.DynamoDB({ apiVersion: "2012-10-08" })

export const tableNamePrefix = "AWSMap"

const UserTableName = `${tableNamePrefix}User`

export function createUserTable(callback) {
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

export function getUser(email, callback) {
  try {
    documentClient.get({
      Key: { email },
      ProjectionExpression: "accountCode",
      TableName: UserTableName
    }, (error, data) => {
      if (error) return callback(error)

      if (no(data)) return callback(new EmailNotFoundError())

      callback(null, data.Item)
    })
  } catch (error) {
    callback(error)
  }
}
