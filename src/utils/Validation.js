import {LOGIN_CONST} from './appConstants';

export const validate = (type, value) => {
  let errors = {};
  switch (type) {
    case LOGIN_CONST.EMAIL:
      if (!value) {
        errors.email = 'Please enter email.';
      } else {
        const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        const emailValidCheck = emailRegExp.test(value);
        if (emailValidCheck === false) {
          errors.email = 'Please enter a valid email address.';
        }
      }
      break;
    case LOGIN_CONST.PASSWORD:
      if (!value) {
        errors.password = 'Please enter password.';
      }
      break;
  }
  return errors;
};
