import { addValidationRule } from 'formsy-react';

export const validations = {
  notEmpty: (values, value) => value && !!value.trim(),
  min: (values, value, min) => value >= min,
  max: (values, value, max) => value <= max,
  minTrimLength: (values, value, length) =>
    value && value.trim().length >= length,
  maxTrimLength: (values, value, length) =>
    value && value.trim().length <= length,
  passwordMatch: (values, value, field) =>
    (values[field] && values[field].trim()) == (value && value.trim()),
};

export const errorMessages = {
  isWords: 'Only latin characters are allowed',
  isAlphanumeric: 'Only latin characters and numbers are allowed',
  isNumeric: 'Only numbers are allowed',
  isUrl: 'Value must be a valid URL',
  notEmpty: 'The value is required',
  min: value => `The minimum value is ${value}`,
  max: value => `The maximum value is ${value}`,
  minLength: length => `The minimum length is ${length} characters`,
  maxLength: length => `The maximum length is ${length} characters`,
  passwordMatch: 'Passwords do not match',
};

addValidationRule('notEmpty', validations.notEmpty);
addValidationRule('min', validations.min);
addValidationRule('max', validations.max);
addValidationRule('minTrimLength', validations.minTrimLength);
addValidationRule('maxTrimLength', validations.maxTrimLength);
addValidationRule('passwordMatch', validations.passwordMatch);
