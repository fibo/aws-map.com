import {
  createTableUser,
} from "./dynamo"

function createTableCallback (err, data) {
  if (err) throw err

  console.log(JSON.stringify(data, null, "\t"))
}
