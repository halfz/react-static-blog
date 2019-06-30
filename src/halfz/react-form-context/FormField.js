export default class FormField {
  static of(initialValue, validator) {
    return new FormField(initialValue, validator);
  }

  constructor(initialValue, validator) {
    this.value = initialValue;
    this.validator = validator;
  }

  getValue() {
    return this.value;
  }
}
