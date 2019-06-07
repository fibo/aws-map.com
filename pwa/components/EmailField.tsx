import * as React from "react"
import {
  Control,
  Field,
  Input,
  Label,
} from "trunx"

interface IProps {
  inputRef?: React.RefObject<HTMLInputElement>
}

export default class EmailField extends React.Component<IProps> {
  render() {
    const {
      inputRef,
    } = this.props

    return (
      <Field>
        <Label>Email</Label>

        <Control>
          <Input
            inputRef={inputRef}
            required
            type="email"
          />
        </Control>
      </Field>
    )
  }
}
