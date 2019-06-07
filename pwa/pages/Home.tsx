// import * as history from "history"
import * as React from "react"
import { Link } from "react-router-dom"

import CreateAccountPage from "./CreateAccount"
import EnterPage from "./Enter"

class HomePage extends React.Component {
  static path = "/"

  render() {
    return (
      <div>
        <Link to={CreateAccountPage.path}>Register</Link>

        <br />

        <Link to={EnterPage.path}>Login</Link>
      </div>
    )
  }
}

export default HomePage
