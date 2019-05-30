import * as AWS from "aws-sdk"

export const region = "us-east-1"

AWS.config.update({ region })

export default AWS
