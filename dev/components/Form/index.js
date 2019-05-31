import React from 'react';
import Formsy from 'formsy-react';

export const Form = props => {
  const { onValid, onInvalid, onSubmit, onChange, innerRef, children } = props;
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
};

export default Form;
