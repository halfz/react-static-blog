
class IdGenerator {
  constructor(prefix) {
    this.prefix = String(prefix);
    this.n = 0;
  }

  next() {
    // eslint-disable-next-line no-bitwise
    this.n = 1 + this.n | 0;

    /* istanbul ignore if */
    if (this.n < 0) {
      this.n = 1;
    }

    return this.prefix + this.n;
  }
}

export default IdGenerator;
