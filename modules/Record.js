let guard = Symbol('EmptyRecord');
let values = Symbol('CustomValues');
let defaults = Symbol('DefaultValues');
let empty = () => void 0;

export default class Record {
  constructor(custom = {}) {
    if (custom === guard) return this;

    if (!this.constructor.hasOwnProperty(defaults)) {
      let emptyRecord = new this.constructor(guard);
      Object.defineProperty(this.constructor, defaults, {
        value: emptyRecord,
      });
    }

    let base = this.constructor[defaults];

    for (let key in base) {
      if (!base.hasOwnProperty(key)) continue;

      let getter = key in custom ? () => custom[key] : () => base[key];

      Object.defineProperty(this, key, {
        enumerable: true,
        get: getter,
        set: empty,
      });
    }

    Object.defineProperty(this, values, {
      value: custom,
    });
  }

  copy(patch) {
    let custom = Object.assign({}, this[values], patch);
    let prototype = Object.getPrototypeOf(this);
    return new prototype.constructor(custom);
  }

  equals(record) {
    let a = this[values];
    let b = record[values];

    for (let key in this.constructor[defaults]) {
      if (a[key] && typeof a[key].equals === 'function') {
        if (!a[key].equals(b[key])) return false;
      } else if (a[key] !== b[key]) return false;
    }

    return true;
  }

  toJSON() {
    let result = {};

    for (let key in this.constructor[defaults]) {
      let value = this[key];
      result[key] = (value && typeof value.toJSON === 'function') ? value.toJSON() : value
    }

    return result;
  }
}
