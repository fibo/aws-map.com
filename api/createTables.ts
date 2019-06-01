import * as dynamo from "./dynamo"

async function createTables() {
  const createUserTableResponse = await dynamo.createUserTable()
  console.log(JSON.stringify(createUserTableResponse, null, "\t"))
}

createTables()
