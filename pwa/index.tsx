import * as React from "react"
import { render } from "react-dom"

import { initialState as account } from "./reducers/account"

import configureStore from "./store/configureStore"

const initialState = {
  account
}

import Root from "./Root"

window.addEventListener("load", () => {
  // Hide splashscreen.
  const splashscreen = document.querySelector(".splashscreen") as HTMLElement
  splashscreen.style.display = "none"

  // Mount app.
  render(<Root store={configureStore(initialState)} />, document.getElementById("root"))
})
