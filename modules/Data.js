let O = Object;

let produce = (proto, base, values) =>
  O.freeze(O.assign(O.seal(O.assign(O.create(proto), base)), values));

export class Data {
  static create(values) {
    return produce(this.prototype, new this(Data), values);
  }

  constructor(values) {
    if (values !== Data) {
      throw new Error(`Use ${this.constructor.name}.create(...) instead of new operator`);
    }
  }

  copy(values) {
    return produce(O.getPrototypeOf(this), this, values);
  }

  equals(other) {
    for (let key in this) {
      let a = this[key];
      let b = other[key];
      if (
        a !== b &&
        (a == null ||
          b == null ||
          (a instanceof Data && b instanceof Data ? !a.equals(b) : a.valueOf() !== b.valueOf()))
      )
        return false;
    }

    return true;
  }
}
