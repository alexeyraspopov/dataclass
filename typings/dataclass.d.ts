export class Data {
  static create<Type extends Data>(this: { new (): Type }, values?: Partial<Type>): Type;
  copy(values: Partial<this>): this;
  equals(other: this): boolean;
}
