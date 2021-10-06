export class Record {
  static create(custom?: Partial<this>): this;
  copy(patch: Partial<this>): this;
  equals(record: this): boolean;
  toJSON(): Object;
}
