export class Data {
  static create<Type extends Data>(
    this: { new (): Type },
    values?: Omit<Partial<Type>, keyof Data>,
  ): Type;
  copy(values?: Omit<Partial<this>, keyof Data>): this;
  equals(other: this): boolean;
}
