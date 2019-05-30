import React from 'react';
import { withFormsy } from 'formsy-react';
import FormGroup from 'reactstrap/lib/FormGroup';
import Label from 'reactstrap/lib/Label';
import InputBootsrap from 'reactstrap/lib/Input';
import FormFeedback from 'reactstrap/lib/FormFeedback';

export class Input extends React.Component {
  onChange = e => this.props.setValue(e.currentTarget.value);
  render = () => {
    const errorMessage = this.props.getErrorMessage();
    const valid = this.props.isValid();
    const touched = !this.props.isPristine();
    const value = this.props.getValue() || '';
    const {
      className,
      type,
      label,
      placeholder,
      min,
      max,
      step,
      minLength,
      maxLength,
    } = this.props;
    return (
      <FormGroup className={className}>
        {label && <Label>{label}</Label>}
        <InputBootsrap
          type={type}
          valid={touched && valid && Boolean(value)}
          invalid={touched && !valid}
          onChange={this.onChange}
          value={value}
          placeholder={placeholder}
          max={max}
          min={min}
          step={step}
          minLength={minLength}
          maxLength={maxLength}
        />
        {errorMessage && <FormFeedback>{errorMessage}</FormFeedback>}
      </FormGroup>
    );
  };
}

export default withFormsy(Input);
