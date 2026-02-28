import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { USER_REGEX } from '../../constants/regex/user-regex.constant';

export const noWhitespaceValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const isWhiteSpace = (control.value || '').trim().length === 0;
  return !isWhiteSpace ? null : { customError: 'This field cannot be empty or whitespace' };
};

export const nameValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const isValid = USER_REGEX.NAME.test(control.value);
  return isValid ? null : { customError: 'Name is invalid. Only alphabets and spaces are allowed' };
};

export const emailValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const isValid = USER_REGEX.EMAIL.test(control.value);
  return isValid ? null : { customError: 'Enter a valid email address' };
};

export const passwordValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const value = control.value;
  const valid = USER_REGEX.PASSWORD.test(value);
  return valid
    ? null
    : {
        customError: 'Password must include uppercase, lowercase, and number characters',
      };
};

export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (!confirmPassword) {
    return { customError: 'This field is required' };
  } else if (password && confirmPassword && password !== confirmPassword) {
    return { customError: 'Confirm with same password' };
  }
  return null;
};
