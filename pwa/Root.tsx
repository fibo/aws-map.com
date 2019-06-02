import * as React from "react"
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from "react-router-dom"

import CreateAccountPage from "./pages/CreateAccount"
import EnterPage from "./pages/Enter"
import HomePage from "./pages/Home"

export default class Root extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route component={CreateAccountPage} exact path={CreateAccountPage.path} />

          <Route component={EnterPage} exact path={EnterPage.path} />

          <Route component={HomePage} exact path={HomePage.path} />

          <Redirect from="*" to={HomePage.path} />
        </Switch>
      </BrowserRouter>
    )
  }
}
