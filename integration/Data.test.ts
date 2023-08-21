import { test } from "node:test";
import { deepEqual, equal, throws } from "node:assert/strict";

import { Data } from "../build";

class Entity extends Data {
  someString: string = "default string";
  someNum: number = 0.134;
  someBool: boolean = true;
  someNullable: string | null = null;

  get exclamation() {
    return this.someString + "!";
  }
}

function plain(target: object) {
  return Object.fromEntries(Object.entries(target));
}

test("should create an entity with default values", () => {
  let entity = Entity.create();

  deepEqual(plain(entity), {
    someString: "default string",
    someNum: 0.134,
    someBool: true,
    someNullable: null,
  });
});

test("should override defaults with custom values", () => {
  let entity = Entity.create({ someNullable: "1", someString: "hello" });

  deepEqual(plain(entity), {
    someString: "hello",
    someNum: 0.134,
    someBool: true,
    someNullable: "1",
  });
});

test("should satisfy composition law", () => {
  let entity = Entity.create();
  let left = entity.copy({ someNum: 13, someBool: false });
  let right = entity.copy({ someNum: 13 }).copy({ someBool: false });

  deepEqual(left, right);
  equal(left.equals(right), true);
});

test("should support subclassing", () => {
  class SubEntity extends Entity {
    someNewThing: string = "default";
  }

  let entityA = SubEntity.create();
  let entityB = SubEntity.create({ someString: "test", someNewThing: "blah" });

  deepEqual(plain(entityA), {
    someString: "default string",
    someNum: 0.134,
    someBool: true,
    someNullable: null,
    someNewThing: "default",
  });

  deepEqual(plain(entityB), {
    someString: "test",
    someNum: 0.134,
    someBool: true,
    someNullable: null,
    someNewThing: "blah",
  });
});

test("should support polymorphism", () => {
  class Base extends Data {
    format: string = "AAA";

    transform(value: string) {
      return this.format.replace(/A/g, value);
    }
  }

  class Child extends Base {
    transform(value: string) {
      return "-" + this.format.replace(/A/g, value);
    }
  }

  let baseEntity = Base.create({ format: "AAAAA" });
  let childEntity = Child.create();

  equal(baseEntity.transform("1"), "11111");
  equal(childEntity.transform("1"), "-111");
});

test("should create new entity based on existent", () => {
  let entity = Entity.create({ someBool: false });
  let updated = entity.copy({ someNum: 14 });

  deepEqual(plain(entity), {
    someString: "default string",
    someNum: 0.134,
    someBool: false,
    someNullable: null,
  });

  deepEqual(plain(updated), {
    someString: "default string",
    someNum: 14,
    someBool: false,
    someNullable: null,
  });
});

test("should compare custom values for two entities of the same type", () => {
  let entityA = Entity.create({ someBool: false, someNullable: null });
  let equalE = Entity.create({ someBool: false, someNum: 0.134 });
  let unequal = Entity.create({ someBool: false, someNullable: undefined });
  let entityB = Entity.create({ someNullable: "1" });
  let entityC = Entity.create({ someNullable: null });
  let extended = entityB.copy({ someBool: true });
  let updated = entityA.copy({ someNum: 14 });

  equal(entityA.equals(updated), false);
  equal(entityA.equals(equalE), true);
  equal(unequal.equals(equalE), false);
  equal(entityB.equals(extended), true);
  equal(entityB.equals(entityA), false);
  equal(entityB.equals(entityC), false);
});

class Embedded extends Data {
  name: string = "name";
  age: number = 1;
  entity: Entity | null = Entity.create();
  date: Date = new Date();
  obj: Object | null = { foo: "bar" };
}

test("should be serializable with embedded dataclass", () => {
  let dummyDate = new Date("1996-12-17T03:24:00");
  let embedded = Embedded.create({ date: dummyDate });
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
  equal(JSON.stringify(embedded), JSON.stringify(raw));
});

test("should compare dataclass with nested value objects", () => {
  let embeddedA = Embedded.create({
    date: new Date("1996-12-17T03:24:00"),
    entity: Entity.create({ someBool: false }),
    obj: null,
  });
  let embeddedB = Embedded.create({
    date: new Date("1996-12-17T03:24:00"),
    entity: Entity.create({ someBool: false }),
    obj: null,
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
  equal(embeddedA.equals(embeddedB), true);
  equal(embeddedB.equals(embeddedC), false);
  equal(embeddedC.equals(embeddedD), false);
  equal(embeddedD.equals(embeddedE), false);
});

test("should satisfy symmetry law", () => {
  let a = Entity.create({ someString: "1" });
  let b = Entity.create({ someString: "1" });
  let c = Entity.create({ someString: "2" });

  equal(a.equals(b), true);
  equal(b.equals(a), true);
  equal(a.equals(c), false);
  equal(c.equals(a), false);
});

test("should satisfy transitivity law", () => {
  let a = Entity.create({ someString: "hello" });
  let b = Entity.create({ someString: "hello" });
  let c = Entity.create({ someString: "hello" });

  equal(a.equals(b), true);
  equal(b.equals(c), true);
  equal(a.equals(c), true);
});

test("should support iterables", () => {
  let entity = Entity.create({ someBool: false });

  deepEqual(Object.entries(entity), [
    ["someString", "default string"],
    ["someNum", 0.134],
    ["someBool", false],
    ["someNullable", null],
  ]);

  deepEqual(Object.keys(entity), ["someString", "someNum", "someBool", "someNullable"]);

  deepEqual(Object.values(entity), ["default string", 0.134, false, null]);
});

test("should not allow assignment", () => {
  let entity = Entity.create({ someBool: false });

  equal(Object.isFrozen(entity), true);

  throws(() => {
    entity.someBool = true;
  }, /Cannot assign/);

  throws(() => {
    // @ts-ignore intentional addition of inexistent property to assert runtime error
    entity.somethingElse = null;
  }, /Cannot add property/);
});

test("should prohibit new properties", () => {
  let entity = Entity.create({ someBool: false });

  equal(Object.isSealed(entity), true);

  throws(() => {
    // @ts-ignore intentional addition of inexistent property to assert runtime error
    Entity.create({ thisShouldNotBeHere: 1 });
  }, /object is not extensible/);

  throws(() => {
    // @ts-ignore intentional addition of inexistent property to assert runtime error
    Entity.create().copy({ thisShouldNotBeHere: 1 });
  }, /object is not extensible/);
});

test("should support predefined getters", () => {
  let entity = Entity.create({ someString: "abcde" });

  equal(entity.exclamation, "abcde!");
});

test("should disallow use of constructor", () => {
  throws(() => {
    new Entity();
  }, /Use Entity.create/);
});

test("should allow dynamic defaults per instance", () => {
  class Ent extends Data {
    id: string = Math.random().toString(16).slice(2, 8);
  }
  let a1 = Ent.create();
  let a2 = a1.copy();
  let b = Ent.create();
  equal(a1.equals(a2), true);
  equal(b.equals(a1), false);
  equal(b.equals(a2), false);
});
