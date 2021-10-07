export class Data<Type extends Data> {
  static create(custom?: Partial<Type>): Type;
  copy(patch: Partial<Type>): Type;
  equals(record: Type): boolean;
  toJSON(): Object;
}
