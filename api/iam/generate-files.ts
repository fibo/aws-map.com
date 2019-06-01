import fs from "fs"
import no from "not-defined"
import path from "path"
import { promisify } from "util"

import { nakedDomain } from "../domainNames"
import { tableNamePrefix } from "../dynamo"
import { MissingAwsAccountIdError } from "../errors"
import { region as AWS_REGION } from "../region"

const writeFile = promisify(fs.writeFile)

const AWS_ACCOUNT_ID = process.env.AWS_ACCOUNT_ID

if (no(AWS_ACCOUNT_ID)) {
  throw new MissingAwsAccountIdError()
}

const lambdaPolicy = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:${AWS_REGION}:${AWS_ACCOUNT_ID}:*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:DeleteItem",
        "dynamodb:ListTables",
        "dynamodb:GetItem",
        "dynamodb:PutItem",
        "dynamodb:Query",
        "dynamodb:Scan"
      ],
      "Resource": "arn:aws:dynamodb:${AWS_REGION}:${AWS_ACCOUNT_ID}:table/${tableNamePrefix}*"
    },
    {
      "Effect":"Allow",
      "Resource":"arn:aws:ses:${AWS_REGION}:${AWS_ACCOUNT_ID}:identity/${nakedDomain}",
      "Action":[
        "SES:SendEmail",
        "SES:SendRawEmail"
      ],
      "Condition":{
        "StringLike":{
          "ses:FromAddress":"no-reply@${nakedDomain}"
        }
      }
    }
  ]
}`

const trustService = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": [
          "lambda.amazonaws.com"
        ]
      },
      "Action": "sts:AssumeRole"
    }
  ]
}`

async function generateFiles() {
  try {
    await writeFile(path.join(__dirname, "lambda-policy.json"), lambdaPolicy)
    await writeFile(path.join(__dirname, "trust-service.json"), trustService)
  } catch (error) {
    throw error
  }
}

generateFiles()
