export default class Record {
  constructor(custom) {
    for (const key in custom) {
      Object.defineProperty(this, key, {
        get() { return custom[key]; },
        set() { return null; },
      });
    }
  }

  merge(patch) {
    const values = Object.assign({}, this, patch);
    return new this.constructor(values);
  }

  equals(record) {
    for (const key in this) {
      if (this[key] !== record[key]) return false;
    }
    return true;
  }
}
