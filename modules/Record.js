let guard = Symbol('EmptyRecord');
let values = Symbol('CustomValues');
let callable = (v, m) => v != null && typeof v[m] === 'function';

export class Record {
  static create(values = {}) {
    let record = new this(guard);
    Object.defineProperty(record, values, { value: values });
    Object.assign(record, values);
    return Object.freeze(record);
  }

  constructor(value) {
    if (value !== guard) throw new Error('Use Class.create(...) method instead of `new` operator');
  }

  copy(patch) {
    let values = Object.assign({}, this[values], patch);
    let prototype = Object.getPrototypeOf(this);
    return prototype.constructor.create(values);
  }

  equals(record) {
    let va = this[values];
    let vb = record[values];

    for (let key in this) {
      let hasA = va.hasOwnProperty(key);
      let hasB = vb.hasOwnProperty(key);
      if (hasA || hasB) {
        let a = hasA ? va[key] : this[key];
        let b = hasB ? vb[key] : record[key];
        if (a !== b) {
          if (callable(a, 'equals') && callable(b, 'equals')) {
            if (!a.equals(b)) return false;
          } else if (callable(a, 'valueOf') && callable(b, 'valueOf')) {
            if (a.valueOf() !== b.valueOf()) return false;
          } else return false;
        }
      }
    }

    return true;
  }

  toJSON() {
    let result = {};
    for (let key in this) {
      let value = this[key];
      result[key] = callable(value, 'toJSON') ? value.toJSON() : value;
    }
    return result;
  }
}
