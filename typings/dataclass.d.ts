export class Data {
  static create<Type extends Data>(this: Static<Type>, custom?: Partial<Type>): Type;
  copy(patch: Partial<this>): this;
  equals(record: this): boolean;
  toJSON(): Object;
}

type Static<Type extends Data> = { new (): Type };
