import * as React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import {
  Button,
} from "trunx"

import CreateAccountPage from "./CreateAccount"
import EnterAccountPage from "./EnterAccount"

import {
  exitAccount,
} from "../reducers/account"

interface IProps {
  authenticationIsValid: boolean
  exitAccount: () => void
}

class HomePage extends React.Component<IProps> {
  static path = "/"

  onClickLogout = () => {
    this.props.exitAccount()
  }

  render() {
    const {
      authenticationIsValid,
    } = this.props

    return (
      authenticationIsValid ? (
        <div>
          <Button onClick={this.onClickLogout}>Logout</Button>
        </div>
      ) : (
        <div>
          <Link to={CreateAccountPage.path}>Register</Link>

          <br />

          <Link to={EnterAccountPage.path}>Login</Link>
        </div>
      )
    )
  }
}

const mapStateToProps = (state) => {
  const {
    account,
  } = state

  const {
    authentication,
  } = account

  const authenticationIsValid = authentication === null ? false : authentication.isValid

  return {
    authenticationIsValid,
  }
}

const mapDispatchToProps = (dispatch) => ({
  exitAccount: () => dispatch(exitAccount()),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
