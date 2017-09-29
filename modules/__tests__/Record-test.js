/* @flow */
import Record from '../Record';

describe('Record', () => {
  class Entity extends Record {
    someString: string = 'default string';
    someNum: number = 0.134;
    someBool: boolean = true;
    someNullable: ?string = null;

    get exclamation() {
      return this.someString + '!';
    }
  }

  it('should create an entity with default values', () => {
    const entity = new Entity();

    expect(entity)
      .toEqual({ someString: 'default string', someNum: 0.134,
                 someBool: true, someNullable: null });
  });

  it('should override defaults with custom values', () => {
    const entity = new Entity({ someNullable: 1, someString: 'hello' });

    expect(entity)
      .toEqual({ someString: 'hello', someNum: 0.134,
                 someBool: true, someNullable: 1 });
  });

  it('should create new entity based on existent', () => {
    const entity = new Entity({ someBool: false });
    const updated = entity.copy({ someNum: 14 });

    expect(entity)
      .toEqual({ someString: 'default string', someNum: 0.134,
                 someBool: false, someNullable: null });

    expect(updated)
      .toEqual({ someString: 'default string', someNum: 14,
                 someBool: false, someNullable: null });
  });

  it('should compare custom values for two entities of the same type', () => {
    const entity = new Entity({ someBool: false });
    const equal = new Entity({ someBool: false });
    const updated = entity.copy({ someNum: 14 });

    expect(entity.equals(updated))
      .toBe(false);

    expect(entity.equals(equal))
      .toBe(true);
  });

  it('should be serializable', () => {
    const entity = new Entity({ someBool: false });
    const raw = { someString: 'default string', someNum: 0.134,
                  someBool: false, someNullable: null };

    expect(JSON.stringify(entity))
      .toBe(JSON.stringify(raw));
  });

  it('should support iterables', () => {
    const entity = new Entity({ someBool: false });

    expect(Object.entries(entity))
      .toEqual([['someString', 'default string'],
                ['someNum', 0.134],
                ['someBool', false],
                ['someNullable', null]]);

    expect(Object.keys(entity))
      .toEqual(['someString', 'someNum', 'someBool', 'someNullable']);

    expect(Object.values(entity))
      .toEqual(['default string', 0.134, false, null]);
  });

  it('should not allow assignment', () => {
    const entity = new Entity({ someBool: false });

    entity.someBool = null;

    expect(entity.someBool)
      .toBe(false);
  });

  it('should support predefined getters', () => {
    const entity = new Entity({ someString: 'abcde' });

    expect(entity.exclamation)
      .toBe('abcde!');
  });
});
