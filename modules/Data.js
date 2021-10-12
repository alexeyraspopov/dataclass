let GUARD = Symbol('Empty');
let VALUES = Symbol('Values');

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
          if (a != null && b != null) {
            if (a instanceof Data && b instanceof Data && a.equals(b)) continue;
            if (a.valueOf() !== b.valueOf()) return false;
          } else return false;
        }
      }
    }

    return true;
  }
}
