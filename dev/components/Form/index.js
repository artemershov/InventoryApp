import React, { Component } from 'react';
import Formsy from 'formsy-react';

export class Form extends Component {
  render() {
    const {
      onValid,
      onInvalid,
      onSubmit,
      onChange,
      innerRef,
      children,
    } = this.props;
    return (
      <Formsy
        onValid={onValid}
        onInvalid={onInvalid}
        onValidSubmit={onSubmit}
        onChange={onChange}
        ref={innerRef}>
        {children}
      </Formsy>
    );
  }
}

export default Form;
