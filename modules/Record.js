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
        enumerable: false,
        get: () => emptyRecord,
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
      enumerable: false,
      get: () => custom,
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
      if (a[key] !== b[key]) return false;
    }

    return true;
  }

  toJSON() {
    let result = {};

    for (let key in this.constructor[defaults]) {
      result[key] = this[key];
    }

    return result;
  }
}
