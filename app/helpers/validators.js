export const multiValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)
