import React from 'react';
import { withFormsy } from 'formsy-react';
import FormGroup from 'reactstrap/lib/FormGroup';
import Label from 'reactstrap/lib/Label';
import Input from 'reactstrap/lib/Input';
import FormFeedback from 'reactstrap/lib/FormFeedback';

export class Checkbox extends React.Component {
  onChange = e => this.props.setValue(e.currentTarget.checked);
  render = () => {
    const errorMessage = this.props.getErrorMessage();
    const valid = this.props.isValid();
    const touched = !this.props.isPristine();
    const value = this.props.getValue() || false;
    const { label } = this.props;
    return (
      <FormGroup check>
        <Label check>
          <Input
            type="checkbox"
            valid={touched && valid}
            invalid={touched && !valid}
            onChange={this.onChange}
            checked={value}
          />{' '}
          {label}
          {errorMessage && <FormFeedback>{errorMessage}</FormFeedback>}
        </Label>
      </FormGroup>
    );
  };
}

export default withFormsy(Checkbox);
