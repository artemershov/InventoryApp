import React from 'react';
import Form from '../Form';
import Input from '../Form/Input';
import Button from 'reactstrap/lib/Button';
import { errorMessages } from '../Form/validation';

export const SignUp = props => (
  <Form onSubmit={props.onSubmit} onChange={props.onChange}>
    <Input
      name="name"
      type="text"
      placeholder="Name"
      validations="notEmpty,isWords,maxTrimLength:128"
      validationErrors={{
        ...errorMessages,
        maxTrimLength: errorMessages.maxLength(128),
      }}
      required
    />
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
    <Input
      name="repassword"
      type="password"
      placeholder="Repeat password"
      validations="notEmpty,minTrimLength:6,maxTrimLength:128,passwordMatch:password"
      validationErrors={{
        ...errorMessages,
        minTrimLength: errorMessages.minLength(6),
        maxTrimLength: errorMessages.maxLength(128),
      }}
      required
    />
    <Button type="submit" block color="primary">
      Sign Up
    </Button>
  </Form>
);

export default SignUp;
