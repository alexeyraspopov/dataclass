/* @flow */
import { Data } from "../Data.js";

describe("Data", () => {
  class Entity extends Data {
    someString: string = "default string";
    someNum: number = 0.134;
    someBool: boolean = true;
    someNullable: ?string = null;

    get exclamation() {
      return this.someString + "!";
    }
  }

  it("should create an entity with default values", () => {
    let entity = Entity.create();

    expect(entity).toEqual({
      someString: "default string",
      someNum: 0.134,
      someBool: true,
      someNullable: null,
    });
  });

  it("should override defaults with custom values", () => {
    let entity = Entity.create({ someNullable: 1, someString: "hello" });

    expect(entity).toEqual({
      someString: "hello",
      someNum: 0.134,
      someBool: true,
      someNullable: 1,
    });
  });

  it("should satisfy composition law", () => {
    let entity = Entity.create();
    let left = entity.copy({ someNum: 13, someBool: false });
    let right = entity.copy({ someNum: 13 }).copy({ someBool: false });

    expect(left).toEqual(right);
    expect(left.equals(right)).toBe(true);
  });

  it("should support subclassing", () => {
    class SubEntity extends Entity {
      someNewThing: string = "default";
    }

    let entityA = SubEntity.create();
    let entityB = SubEntity.create({ someString: "test", someNewThing: "blah" });

    expect(entityA).toEqual({
      someString: "default string",
      someNum: 0.134,
      someBool: true,
      someNullable: null,
      someNewThing: "default",
    });

    expect(entityB).toEqual({
      someString: "test",
      someNum: 0.134,
      someBool: true,
      someNullable: null,
      someNewThing: "blah",
    });
  });

  it("should support polymorphism", () => {
    class Base extends Data {
      format: string = "AAA";

      transform(value) {
        return this.format.replace(/A/g, value);
      }
    }

    class Child extends Base {
      transform(value) {
        return "-" + this.format.replace(/A/g, value);
      }
    }

    let baseEntity = Base.create({ format: "AAAAA" });
    let childEntity = Child.create();

    expect(baseEntity.transform(1)).toBe("11111");
    expect(childEntity.transform(1)).toBe("-111");
  });

  it("should create new entity based on existent", () => {
    let entity = Entity.create({ someBool: false });
    let updated = entity.copy({ someNum: 14 });

    expect(entity).toEqual({
      someString: "default string",
      someNum: 0.134,
      someBool: false,
      someNullable: null,
    });

    expect(updated).toEqual({
      someString: "default string",
      someNum: 14,
      someBool: false,
      someNullable: null,
    });
  });

  it("should compare custom values for two entities of the same type", () => {
    let entityA = Entity.create({ someBool: false, someNullable: null });
    let equal = Entity.create({ someBool: false, someNum: 0.134 });
    let unequal = Entity.create({ someBool: false, someNullable: undefined });
    let entityB = Entity.create({ someNullable: 1 });
    let entityC = Entity.create({ someNullable: null });
    let extended = entityB.copy({ someBool: true });
    let updated = entityA.copy({ someNum: 14 });

    expect(entityA.equals(updated)).toBe(false);
    expect(entityA.equals(equal)).toBe(true);
    expect(unequal.equals(equal)).toBe(false);
    expect(entityB.equals(extended)).toBe(true);
    expect(entityB.equals(entityA)).toBe(false);
    expect(entityB.equals(entityC)).toBe(false);
  });

  class Embedded extends Data {
    name: string = "name";
    age: number = 1;
    entity: Entity = Entity.create();
    date: Date = new Date();
    obj: Object = { foo: "bar" };
  }

  it("should be serializable with embedded dataclass", () => {
    let dummyDate = new Date("1996-12-17T03:24:00");
    let embedded = Embedded.create({
      date: dummyDate,
    });
    let raw = {
      name: "name",
      age: 1,
      entity: {
        someString: "default string",
        someNum: 0.134,
        someBool: true,
        someNullable: null,
      },
      date: dummyDate.toISOString(),
      obj: {
        foo: "bar",
      },
    };
    expect(JSON.stringify(embedded)).toBe(JSON.stringify(raw));
  });

  it("should compare dataclass with nested value objects", () => {
    let embeddedA = Embedded.create({
      date: new Date("1996-12-17T03:24:00"),
      entity: Entity.create({ someBool: false }),
    });
    let embeddedB = Embedded.create({
      date: new Date("1996-12-17T03:24:00"),
      entity: Entity.create({ someBool: false }),
    });
    let embeddedC = Embedded.create({
      date: new Date("1996-12-17T03:24:00"),
      entity: Entity.create({ someBool: true }),
    });
    let embeddedD = Embedded.create({
      date: new Date("2001-12-17T03:24:00"),
      entity: Entity.create({ someBool: true }),
    });
    let embeddedE = Embedded.create({
      date: new Date("2001-12-17T03:24:00"),
      entity: null,
    });
    expect(embeddedA.equals(embeddedB)).toBe(true);
    expect(embeddedB.equals(embeddedC)).toBe(false);
    expect(embeddedC.equals(embeddedD)).toBe(false);
    expect(embeddedD.equals(embeddedE)).toBe(false);
  });

  it("should satisfy symmetry law", () => {
    let a = Entity.create({ someString: "1" });
    let b = Entity.create({ someString: "1" });
    let c = Entity.create({ someString: "2" });

    expect(a.equals(b)).toBe(true);
    expect(b.equals(a)).toBe(true);
    expect(a.equals(c)).toBe(false);
    expect(c.equals(a)).toBe(false);
  });

  it("should satisfy transitivity law", () => {
    let a = Entity.create({ someString: "hello" });
    let b = Entity.create({ someString: "hello" });
    let c = Entity.create({ someString: "hello" });

    expect(a.equals(b)).toBe(true);
    expect(b.equals(c)).toBe(true);
    expect(a.equals(c)).toBe(true);
  });

  it("should support iterables", () => {
    let entity = Entity.create({ someBool: false });

    expect(Object.entries(entity)).toEqual([
      ["someString", "default string"],
      ["someNum", 0.134],
      ["someBool", false],
      ["someNullable", null],
    ]);

    expect(Object.keys(entity)).toEqual(["someString", "someNum", "someBool", "someNullable"]);

    expect(Object.values(entity)).toEqual(["default string", 0.134, false, null]);
  });

  it("should not allow assignment", () => {
    let entity = Entity.create({ someBool: false });

    expect(Object.isFrozen(entity)).toBe(true);

    expect(() => {
      entity.someBool = null;
    }).toThrow(/Cannot assign/);

    expect(() => {
      entity.somethingElse = null;
    }).toThrow(/Cannot add property/);
  });

  it("should prohibit new properties", () => {
    expect(() => {
      Entity.create({ thisShouldNotBeHere: 1 });
    }).toThrow(/object is not extensible/);

    expect(() => {
      Entity.create().copy({ thisShouldNotBeHere: 1 });
    }).toThrow(/object is not extensible/);
  });

  it("should support predefined getters", () => {
    let entity = Entity.create({ someString: "abcde" });

    expect(entity.exclamation).toBe("abcde!");
  });

  it("should disallow use of constructor", () => {
    expect(() => {
      new Entity();
    }).toThrow(/Use Entity.create/);
  });
});
