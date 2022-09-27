# Getting Started

## Defining data classes

This library provides an abstract class `Data`:

```ts:no-line-numbers
import { Data } from "dataclass";
```

Which allows to define custom data classes with their set of fields. Assuming, the user is aware of
type systems and have one enabled for their project, this library does not do any type checks in
runtime. This means less overhead for the things, that have to be preserved in compile time or by a
safety net of tests.

The peak of developer experience can be achieved by using TypeScript or JavaScript that is extended
by [class properties](https://github.com/tc39/proposal-class-fields) and
[flowtype](https://flow.org). This allows to write a class with a set of fields following by their
types and default values:

```ts
class User extends Data {
  name: string = "Anonymous";
  age: number = 0;
}
```

Providing a set of fields defines the class' API.

## Creating data objects and accessing properties

New entity is created by using static method `create()` provided by `Data`:

```ts
let userWithCustomValues = User.create({ name: "Liza", age: 23 });
// > User { name: "Liza", age: 23 }

let userWithDefaultValue = User.create({ name: "Ann" });
// > User { name: "Ann", age: 0 }
```

**Warning**: the ability to use `new` operator is prohibited since `Data` needs access to all
properties.

Created entity has all the fields' getters that return either custom or default value:

```ts
// custom value provided to constructor
userWithCustomValues.name === "Liza";

// default value used from the model definition
userWithDefaultValue.age === 0;
```

## Making changes in data objects

Whenever a change should be made, there is `copy()` method that has the same signature as
constructor, based on a fields definition:

```ts
let user = User.create({ name: "Ann" });
// > User { name: "Ann", age: 0 }

let updated = user.copy({ age: 28 });
// > User { name: "Ann", age: 28 }
```

This method returns a new entity built upon previous set of values. The target of `copy()` calls is
not changed, by the definition of persistence.

## Comparing data objects by value

Since all the entities of one class are unique by their object reference, comparison operator will
always give `false` as a result. To compare the actual properties of the same class' entities,
`equals()` method should be used:

```ts
let userA = User.create({ name: "Ann" });
let userB = User.create({ name: "Ann" });

userA === userB;
// > false

userA.equals(userB);
// > true
```

All the API is fully compatible, so the code looks the same in JavaScript and TypeScript.

## Going beyond properties

Often, models may have a set of additional getters that represent computed values based on raw data.
They can be easily described as plain class' methods:

```ts{6-8,10-12}
class User extends Data {
  firstName: string = "John";
  lastName: string = "Doe";
  age: number = 0;

  isAdult() {
    return this.age >= 18;
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
```

Getters may receive arguments, however it is recommended to keep them primitive, so a model
[won't know](https://en.wikipedia.org/wiki/Law_of_Demeter) about some others' internals.

## Nested data objects

When you're modeling complex domains, you may find the need to have one value object as a part of
another value object. This library supports it seamlessly:

```ts{7}
class Url extends Data {
  protocol: string = "https";
  hostname: string;
}

class Server extends Data {
  location: Url;
}
```

## Dynamic values as defaults

Default values of data class properties must be useful. JavaScript provides an ability to use any
expression as a value of class property, and so `dataclass` allows you to leverage this for good.

```ts
import { v4 as uuidv4 } from "uuid";

class Entity extends Data {
  id: string = uuidv4();
}

let entityA = Entity.create();
// > Entity { id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d' }

let entityB = Entity.create();
// > Entity { id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed' }
```

**Note**: make sure to use `dataclass` version 2.1.0 or higher to avoid some old bugs related to
dynamic defaults.
