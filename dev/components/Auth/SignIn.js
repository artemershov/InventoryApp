import React from 'react';
import Button from 'reactstrap/lib/Button';
import Form from '../Form';
import Input from '../Form/Input';
import { errorMessages } from '../Form/validation';

export const SignIn = props => (
  <Form onSubmit={props.onSubmit} onChange={props.onChange}>
    <Input
      name="login"
      type="text"
      placeholder="Login"
      validations="notEmpty,isAlphanumeric,maxTrimLength:128"
      validationErrors={{
        ...errorMessages,
        maxTrimLength: errorMessages.maxLength(128),
      }}
      required
    />
    <Input
      name="password"
      type="password"
      placeholder="Password"
      validations="notEmpty,minTrimLength:6,maxTrimLength:128"
      validationErrors={{
        ...errorMessages,
        minTrimLength: errorMessages.minLength(6),
        maxTrimLength: errorMessages.maxLength(128),
      }}
      required
    />
    <Button type="submit" block color="primary">
      Sign In
    </Button>
  </Form>
);

export default SignIn;
