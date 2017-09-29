const guard = Symbol('EmptyRecord');
const values = Symbol('CustomValues');
const defaults = Symbol('DefaultValues');
const empty = () => void 0;

export default class Record {
  constructor(custom = {}) {
    if (custom === guard) return this;

    if (!this.constructor[defaults]) {
      const emptyRecord = new this.constructor(guard);
      Object.defineProperty(this.constructor, defaults, {
        enumerable: false,
        get: () => emptyRecord
      });
    }

    const base = this.constructor[defaults];

    for (const key in base) {
      if (!base.hasOwnProperty(key)) continue;

      const getter = key in custom
        ? () => custom[key]
        : () => base[key];

      Object.defineProperty(this, key, {
        enumerable: true,
        get: getter,
        set: empty
      });
    }

    Object.defineProperty(this, values, {
      enumerable: false,
      get: () => custom
    });
  }

  copy(patch) {
    const custom = Object.assign({}, this[values], patch);
    const prototype = Object.getPrototypeOf(this);
    return new prototype.constructor(custom);
  }

  equals(record) {
    const a = this[values];
    const b = record[values];

    for (const key in this.constructor[defaults]) {
      if (a[key] !== b[key]) return false;
    }

    return true;
  }
}
