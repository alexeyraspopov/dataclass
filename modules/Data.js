let GUARD = Symbol('Empty');
let VALUES = Symbol('Values');
let callable = (v, m) => v != null && typeof v[m] === 'function';

export class Data {
  static create(values = {}) {
    let data = new this(GUARD);
    Object.defineProperty(data, VALUES, { value: values });
    Object.assign(data, values);
    return Object.freeze(data);
  }

  constructor(values) {
    if (values !== GUARD) throw new Error('Use Class.create(...) method instead of `new` operator');
  }

  copy(values) {
    let composed = Object.assign({}, this[VALUES], values);
    let prototype = Object.getPrototypeOf(this);
    return prototype.constructor.create(composed);
  }

  equals(other) {
    let va = this[VALUES];
    let vb = other[VALUES];

    for (let key in this) {
      let hasA = va.hasOwnProperty(key);
      let hasB = vb.hasOwnProperty(key);
      if (hasA || hasB) {
        let a = hasA ? va[key] : this[key];
        let b = hasB ? vb[key] : other[key];
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
