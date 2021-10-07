export class Data {
  static create<Type extends Data>(this: { new (): Type }, custom?: Partial<Type>): Type;
  copy(patch: Partial<this>): this;
  equals(record: this): boolean;
  toJSON(): Object;
}
