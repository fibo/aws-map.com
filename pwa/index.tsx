import * as React from "react"
import { render } from "react-dom"

import Root from "./Root"

window.addEventListener("load", () => {
  // Hide splashscreen.
  const splashscreen = document.querySelector(".splashscreen") as HTMLElement
  splashscreen.style.display = "none"

  // Mount app.
  render(<Root />, document.getElementById("root"))
})
