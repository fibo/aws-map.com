import * as React from "react"
import { render } from "react-dom"

import Root from "./Root"

window.addEventListener("load", () => {
  // Mount app.
  render(<Root />, document.getElementById("root"))
})
