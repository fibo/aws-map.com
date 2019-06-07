import * as React from "react"
import {
  Control,
  Field,
  Input,
  Label,
} from "trunx"

interface IProps {
  autoComplete?: string
  inputRef: React.RefObject<HTMLInputElement>
}

export default class PasswordField extends React.Component<IProps> {
  render() {
    const {
      autoComplete,
      inputRef,
    } = this.props

    return (
      <Field>
        <Label>Password</Label>

        <Control>
          <Input
            autoComplete={autoComplete}
            inputRef={inputRef}
            required
            type="password"
          />
        </Control>
      </Field>
    )
  }
}
