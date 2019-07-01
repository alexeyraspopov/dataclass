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
    let entity = new Entity();

    expect(entity.toJSON()).toEqual({
      someString: 'default string',
      someNum: 0.134,
      someBool: true,
      someNullable: null,
    });
  });

  it('should override defaults with custom values', () => {
    let entity = new Entity({ someNullable: 1, someString: 'hello' });

    expect(entity.toJSON()).toEqual({
      someString: 'hello',
      someNum: 0.134,
      someBool: true,
      someNullable: 1,
    });
  });

  it('should satisfy composition law', () => {
    let entity = new Entity();
    let left = entity.copy({ someNum: 13, someBool: false });
    let right = entity.copy({ someNum: 13 }).copy({ someBool: false });

    expect(left.toJSON()).toEqual(right.toJSON());
  });

  it('should support subclassing', () => {
    class SubEntity extends Entity {
      someNewThing: string = 'default';
    }

    let entityA = new SubEntity();
    let entityB = new SubEntity({ someString: 'test', someNewThing: 'blah' });

    expect(entityA.toJSON()).toEqual({
      someString: 'default string',
      someNum: 0.134,
      someBool: true,
      someNullable: null,
      someNewThing: 'default',
    });

    expect(entityB.toJSON()).toEqual({
      someString: 'test',
      someNum: 0.134,
      someBool: true,
      someNullable: null,
      someNewThing: 'blah',
    });
  });

  it('should support polymorphism', () => {
    class Base extends Record {
      format: string = 'AAA';

      transform(value) {
        return this.format.replace(/A/g, value);
      }
    }

    class Child extends Base {
      transform(value) {
        return '-' + this.format.replace(/A/g, value);
      }
    }

    let baseEntity = new Base({ format: 'AAAAA' });
    let childEntity = new Child();

    expect(baseEntity.transform(1)).toBe('11111');
    expect(childEntity.transform(1)).toBe('-111');
  });

  it('should create new entity based on existent', () => {
    let entity = new Entity({ someBool: false });
    let updated = entity.copy({ someNum: 14 });

    expect(entity.toJSON()).toEqual({
      someString: 'default string',
      someNum: 0.134,
      someBool: false,
      someNullable: null,
    });

    expect(updated.toJSON()).toEqual({
      someString: 'default string',
      someNum: 14,
      someBool: false,
      someNullable: null,
    });
  });

  it('should compare custom values for two entities of the same type', () => {
    let entity = new Entity({ someBool: false });
    let equal = new Entity({ someBool: false });
    let updated = entity.copy({ someNum: 14 });

    expect(entity.equals(updated)).toBe(false);
    expect(entity.equals(equal)).toBe(true);
  });

  class Embedded extends Record {
    name: string = 'name';
    age: number = 1;
    entity: Entity = new Entity();
    date: Date = new Date();
    obj: Object = {foo: 'bar'};
  }

  it('should be serializable with embedded dataclass', () => {
    let dummyDate = new Date('1996-12-17T03:24:00');
    let embedded = new Embedded({
      date: dummyDate
    });
    let raw = {
      name: "name",
      age: 1,
      entity: {
        someString: "default string",
        someNum: 0.134,
        someBool: true,
        someNullable: null
      },
      date: dummyDate.toISOString(),
      obj: {
        foo: "bar"
      }
    };
    expect(JSON.stringify(embedded)).toBe(JSON.stringify(raw));
  })

  it('should compare dataclass with nested value objects', () => {
    let embeddedA = new Embedded({
      date: new Date('1996-12-17T03:24:00'),
      entity: new Entity({ someBool: false })
    });
    let embeddedB = new Embedded({
      date: new Date('1996-12-17T03:24:00'),
      entity: new Entity({ someBool: false })
    });
    let embeddedC = new Embedded({
      date: new Date('1996-12-17T03:24:00'),
      entity: new Entity({ someBool: true })
    });
    let embeddedD = new Embedded({
      date: new Date('2001-12-17T03:24:00'),
      entity: new Entity({ someBool: true })
    });
    expect(embeddedA.equals(embeddedB)).toBe(true);
    expect(embeddedB.equals(embeddedC)).toBe(false);
    expect(embeddedC.equals(embeddedD)).toBe(false);
  });

  it('should satisfy symmetry law', () => {
    let a = new Entity({ someString: '1' });
    let b = new Entity({ someString: '1' });
    let c = new Entity({ someString: '2' });

    expect(a.equals(b)).toBeTruthy();
    expect(b.equals(a)).toBeTruthy();
    expect(a.equals(c)).toBeFalsy();
    expect(c.equals(a)).toBeFalsy();
  });

  it('should satisfy transitivity law', () => {
    let a = new Entity({ someString: 'hello' });
    let b = new Entity({ someString: 'hello' });
    let c = new Entity({ someString: 'hello' });

    expect(a.equals(b)).toBeTruthy();
    expect(b.equals(c)).toBeTruthy();
    expect(a.equals(c)).toBeTruthy();
  });

  it('should be serializable', () => {
    let entity = new Entity({ someBool: false });
    let raw = {
      someString: 'default string',
      someNum: 0.134,
      someBool: false,
      someNullable: null,
    };

    expect(JSON.stringify(entity)).toBe(JSON.stringify(raw));
  });

  it('should support iterables', () => {
    let entity = new Entity({ someBool: false });

    expect(Object.entries(entity)).toEqual([
      ['someString', 'default string'],
      ['someNum', 0.134],
      ['someBool', false],
      ['someNullable', null],
    ]);

    expect(Object.keys(entity)).toEqual([
      'someString',
      'someNum',
      'someBool',
      'someNullable',
    ]);

    expect(Object.values(entity)).toEqual([
      'default string',
      0.134,
      false,
      null,
    ]);
  });

  it('should not allow assignment', () => {
    let entity = new Entity({ someBool: false });

    entity.someBool = null;

    expect(entity.someBool).toBe(false);
  });

  it('should support predefined getters', () => {
    let entity = new Entity({ someString: 'abcde' });

    expect(entity.exclamation).toBe('abcde!');
  });
});
