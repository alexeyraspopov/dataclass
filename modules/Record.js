export default class Record {
  constructor(custom) {
    for (const key in custom) {
      Object.defineProperty(this, key, {
        get() { return custom[key]; },
        set() { return null; },
      });
    }

    Object.defineProperty(this, '@@values', {
      enumerable: false,
      get() { return custom }
    });
  }

  copy(patch) {
    const values = Object.assign({}, this['@@values'], patch);
    return new this.constructor(values);
  }

  equals(record) {
    const a = this['@@values'];
    const b = record['@@values'];

    for (const key in a) {
      if (a[key] !== b[key]) return false;
    }

    return true;
  }
}
