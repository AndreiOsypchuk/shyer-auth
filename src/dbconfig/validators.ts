type validatorFn = (arg0: string) => boolean;

const validateString: validatorFn = (str: string): boolean => {
  return /^[A-Za-z0-9 ._]+$/.test(str);
};

const validateEmail: validatorFn = (str: string): boolean => {
  const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
  return re.test(str);
};

type validator = {
  validator: validatorFn;
  message: string;
};

export const stringValidator: validator = {
  validator: validateString,
  message: 'Invalid format of the input string',
};

export const emailValidator: validator = {
  validator: validateEmail,
  message: 'Invalid format of email field',
};
