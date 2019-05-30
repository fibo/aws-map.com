import * as AWS from "./AWS"

const documentClient = new AWS.DynamoDB.DocumentClient()

const service = new AWS.DynamoDB({ apiVersion: "2012-10-08" })

const tableNamePrefix = "AWSMap"

const UserTableName = `${tableNamePrefix}User`

export function createTableUser(callback) {
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
