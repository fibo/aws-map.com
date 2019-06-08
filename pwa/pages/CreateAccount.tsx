import * as React from "react"
import { connect } from "react-redux"
import {
  Box,
  Button,
  Control,
  Field,
  Modal,
} from "trunx"

import {
  IAccountCredentials,
  IAuthentication,
} from "../../api/account"

import EmailField from "../components/EmailField"
import PasswordField from "../components/PasswordField"

import {
  createAccount
} from "../reducers/account"

interface IProps {
  authentication: IAuthentication
  createAccount: (ICredentials) => void
  isCreatingAccount: boolean
  resetAuthenticationError: () => void
}

class CreateAccountPage extends React.Component<IProps> {
  static path = "/create-account"

  private emailRef = React.createRef<HTMLInputElement>()
  private passwordRef = React.createRef<HTMLInputElement>()

  onSubmit = (event) => {
    event.preventDefault()

    const email = this.emailRef.current && this.emailRef.current.value
    const password = this.passwordRef.current && this.passwordRef.current.value

    this.props.createAccount({ email, password })
  }

  render() {
    const {
      authentication,
      isCreatingAccount,
    } = this.props

    if (authentication === null) {
      return null
    }

    return (
      <Modal isActive>
        <Modal.Background />

        <Modal.Content>
          <Box>
            <form
              autoComplete="off"
              onSubmit={this.onSubmit}
            >
              <EmailField
                inputRef={this.emailRef}
              />

              <PasswordField
                autoComplete="new-password"
                inputRef={this.passwordRef}
              />

              <Field>
                <Control>
                  <Button
                    isLoading={isCreatingAccount}
                    isSuccess
                    type="submit"
                    value="Create an account"
                  />
                </Control>
              </Field>
            </form>
          </Box>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => ({
  authentication: state.account.authentication,
  isCreatingAccount: state.account.isCreating,
})

const mapDispatchToProps = (dispatch) => ({
  createAccount: (credentials: IAccountCredentials) => dispatch(createAccount(credentials)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccountPage)
