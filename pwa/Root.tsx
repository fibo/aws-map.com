import * as React from "react"
import { Provider } from "react-redux"
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from "react-router-dom"
import { Store } from "redux"

import CreateAccountPage from "./pages/CreateAccount"
import EnterAccountPage from "./pages/EnterAccount"
import HomePage from "./pages/Home"

import {
  CHECK_AUTHENTICATION,
} from "./reducers/account"

interface IProps {
  store: Store
}

export default class Root extends React.Component<IProps> {
  componentDidMount() {
    this.props.store.dispatch({ type: CHECK_AUTHENTICATION })
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <BrowserRouter>
          <Switch>
            <Route component={CreateAccountPage} exact path={CreateAccountPage.path} />

            <Route component={EnterAccountPage} exact path={EnterAccountPage.path} />

            <Route component={HomePage} exact path={HomePage.path} />

            <Redirect from="*" to={HomePage.path} />
          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}
