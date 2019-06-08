import { apiDomain } from "../api/domainNames"

const basePath = `https://${apiDomain}/v1`

const headersForJson = {
  "Accept": "application/json",
  "Content-Type": "application/json",
}

const headersWithAuthentication = (token) => ({
  ...headersForJson,
  Authorization: `BEARER ${token}`,
})

const checkResponse = (response) => {
  if (response.ok) {
    return response.json()
  } else {
    return response.json().then(({ error }) => {
      // Pass error data as string in Error message. See parseError function below.
      throw new Error(JSON.stringify(error))
    })
  }
}

// Strip initial "Error :" in stringified error and return result parsed as JSON.
export function parseError(error: Error) {
  return JSON.parse(error.toString().substring("Error :".length))
}

function client(method, endpoint, token?) {
  const headers = token ? headersWithAuthentication(token) : headersForJson

  return fetch(`${basePath}${endpoint}`, { headers, method }).then(checkResponse)
}

function clientSend(method, endpoint, data, token?) {
  const body = JSON.stringify(data)
  const headers = token ? headersWithAuthentication(token) : headersForJson

  return fetch(`${basePath}${endpoint}`, { body, headers, method }).then(checkResponse)
}

export function del(endpoint, token) {
  return client("DELETE", endpoint, token)
}

export function get(endpoint, token?) {
  return client("GET", endpoint, token)
}

export function put(endpoint, data, token?) {
  return clientSend("PUT", endpoint, data, token)
}

export function post(endpoint, data, token?) {
  return clientSend("POST", endpoint, data, token)
}
