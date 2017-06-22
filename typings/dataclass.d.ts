declare module 'dataclass' {
  // https://github.com/Microsoft/TypeScript/issues/5863
  export default class Record<T> {
    constructor(custom?: Partial<T>);
    copy(patch: Partial<T>): T;
    equals(record: T): boolean;
    toJSON(): Object;
  }
}
