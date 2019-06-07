import * as React from "react"
import {
  Box,
  Button,
  Control,
  Field,
  Modal,
} from "trunx"

import EmailField from "../components/EmailField"
import PasswordField from "../components/PasswordField"

class CreateAccountPage extends React.Component {
  static path = "/create-account"

  private emailRef = React.createRef<HTMLInputElement>()

  onSubmit = (event) => {
    event.preventDefault()
  }

  render() {
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
                inputRef={this.emailRef}
              />

              <Field>
                <Control>
                  <Button
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

export default CreateAccountPage
