import React from 'react';
import { withFormsy } from 'formsy-react';
import FormGroup from 'reactstrap/lib/FormGroup';
import Label from 'reactstrap/lib/Label';
import Input from 'reactstrap/lib/Input';
import FormFeedback from 'reactstrap/lib/FormFeedback';

export class Select extends React.Component {
  onChange = e => this.props.setValue(e.currentTarget.value);
  render = () => {
    const errorMessage = this.props.getErrorMessage();
    const valid = this.props.isValid();
    const touched = !this.props.isPristine();
    const value = this.props.getValue() || '';
    const { className, label, children } = this.props;
    return (
      <FormGroup className={className}>
        {label && <Label>{label}</Label>}
        <Input
          type="select"
          valid={touched && valid}
          invalid={touched && !valid}
          onChange={this.onChange}
          value={value}>
          {children}
        </Input>
        {errorMessage && <FormFeedback>{errorMessage}</FormFeedback>}
      </FormGroup>
    );
  };
}

export default withFormsy(Select);
