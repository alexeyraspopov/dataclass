# Data Class

    npm install dataclass

Syntax sugar that leverages the power of available type systems in JavaScript and TypeScript to
provide an effortless way for defining data structures of domain models and data transfer objects
that are immutable and persistent.

- [Prior Art](#prior-art)
- [Getting Started](#getting-started)
- [API Reference](#api-reference)
- [Serialization & Deserialization](#serialization--deserialization)
- [Contributing](#contributing)

## Prior Art

The implemented concept is heavily inspired by Scala and Kotlin. Both languages have the
implementation of data classes as a part of their syntax and share similar APIs.

See [Case Classes](https://docs.scala-lang.org/tour/case-classes.html) in Scala:

```scala
case class User(name: String = "Anonymous", age: Int = 0)
```

And [Data Classes](https://kotlinlang.org/docs/reference/data-classes.html) in Kotlin:

```kotlin
data class User(val name: String = "Anonymous", val age: Int = 0)
```

```scala
val user = User(name = "Liza", age = 23)
val updated = user.copy(name = "Ann")

user.equals(updated)
```

And [Data Classes](https://docs.python.org/3/library/dataclasses.html) in Python:

```python
from dataclasses import dataclass, replace

@dataclass
class User:
  name: str = 'Anonymous'
  age: int = 0

user = User(name='Liza', age=23)
updated = replace(user, name='Ann')

user == updated
```

## Getting Started

This library provides an abstract class `Record`:

```javascript
import Record from 'dataclass';
```

Which allows to define custom data classes with their set of fields. Assuming, the user is aware of
type systems and have one enabled for their project, this library does not do any type checks in
runtime. This means less overhead for the things, that have to be preserved in compile time or by a
safety net of tests.

The peak of developer experience can be achieved by writing JavaScript that is extended by
[class properties](https://github.com/tc39/proposal-class-fields) and [flowtype](https://flow.org).
This allows to write a class with a set of fields following by their types and default values:

```javascript
class User extends Record {
  name: string = 'Anonymous';
  age: number = 0;
}
```

Almost the same syntax is applicable to TypeScript:

```typescript
class User extends Record<User> {
  name: string = 'Anonymous';
  age: number = 0;
}
```

With one small difference: `Record` is generic in TypeScript's typings due to
[the issue with types in static fields](https://github.com/Microsoft/TypeScript/issues/5863).

Providing a set of fields defines the class' API. New entity is created by using plain old `new`
operator:

```javascript
let userWithCustomValues = new User({ name: 'Liza', age: 23 });
// > User { name: 'Liza', age: 23 }

let userWithDefaultValue = new User({ name: 'Ann' });
// > User { name: 'Ann', age: 0 }
```

Created entity has all the fields' getters that return either custom or default value:

```javascript
// custom value provided to constructor
userWithCustomValues.name === 'Liza';

// default value used from the model definition
userWithDefaultValue.age === 0;
```

Whenever a change should be made, there is `copy()` method that has the same signature as
constructor, based on a fields definition:

```javascript
let user = new User({ name: 'Ann' });
// > User { name: 'Ann', age: 0 }

let updated = user.copy({ age: 28 });
// > User { name: 'Ann', age: 28 }
```

This method returns a new entity built upon previous set of values. The target of `copy()` calls is
not changed, by the definition of persistence.

Since all the entities of one class are unique by their object reference, comparison operator will
always give `false` as a result. To compare the actual properties of the same class' entities,
`equals()` method should be used:

```javascript
let userA = new User({ name: 'Ann' });
let userB = new User({ name: 'Ann' });

userA === userB;
// > false

userA.equals(userB);
// > true
```

All the API is fully compatible, so the code looks the same in JavaScript and TypeScript.

If there is no option to use TypeScript or additional JavaScript transformations, plain constructor
still can be used:

```javascript
class User extends Record {
  constructor(data) {
    super(data);
    this.name = 'Anonymous';
    this.age = 0;
  }
}
```

Often, models may have a set of additional getters that represent computed values based on raw data.
They can be easily described as plain class' methods:

```javascript
class User extends Record {
  firstName: string = 'John';
  lastName: string = 'Doe';
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

## API Reference

### `Record`

Base class for domain models. Should be extended with a set of class fields that describe the shape
of desired model.

#### Example

```javascript
class Project extends Record {
  id: string = '';
  name: string = 'Untitled Project';
  createdBy: string = '';
  createdAt: Date = null;
}
```

### `constructor(data)`

Once extended, data class can be instantiated with a new data. That's the way to get a unique
immutable persistent model.

#### Arguments

1.  `data` (_Object_): POJO which shape satisfy the contract described during class extension. If
    you use [Flow](https://flow.org), it will warn you about the mistakes.

#### Returns

(_Record_): an instance of your data class with all the defined fields accessible as in the plain
object. Properties are read only.

#### Example

```javascript
class Vehicle extends Record {
  model: string = '';
  manufacturer: string = '';
}

let vehicle = new Vehicle({ manufacturer: 'Tesla', model: 'S' });
// > Vehicle { manufacturer: 'Tesla', model: 'S' }

vehicle.manufacturer;
// > 'Tesla'
```

### `copy(patch)`

Create new immutable instance based on an existent one. Since properties are read only, that's the
way to provide an updated model's fields to a consumer keeping the rest unchanged.

#### Arguments

1.  `patch` (_Record_): POJO that includes new values that you want to change. Properties should
    satisfy the contract described by the class.

#### Returns

(_Record_): new instance of the same type and with new values.

#### Example

```javascript
class User extends Record {
  name: string = 'Anonymous';
  email: string = 'email@example.com';
}

let user = new User({ name: 'Liza' });
// > User { name: 'Liza', email: 'email@example.com' }

let updated = user.copy({ email: 'liza@example.com' });
// > User { name: 'Liza', email: 'liza@example.com' }
```

### `equals(record)`

Since immutable instances always have not equal references, there should be a way to compare the
actual values.

#### Arguments

1.  `record` (_Object_): a record of the same type as a target one.

#### Returns

(_Boolean_): `false` if some field value is not
[strictly equal](https://www.ecma-international.org/ecma-262/5.1/#sec-11.9.6) in both records.
`true` otherwise.

#### Example

```javascript
class Box extends Record {
  size: number = 16;
  color: string = 'red';
}

let first = new Box({ color: 'green' });
let second = new Box({ color: 'blue' });
let third = first.copy({ color: 'blue' });

first === second;
// > false

first === third;
// > false

first.equals(second);
// > false

second.equals(third);
// > true
```

## Serialization & Deserialization

In cases where the input data cannot be determined (API requests) or there should be some additional
data preparation done, it is recommended to provide custom and agnostic static methods:

```javascript
class User extends Record {
  name: string = 'Anonymous';
  age: number = 0;

  static from(data: Object): User {
    let name: string = data.name;
    let age: number = parseInt(data.age, 10);
    return new User({ name, age });
  }
}

let user = User.from({ name: 'Liza', age: '18', someUnusedFlag: true });
```

That's how native things handle these cases: see
[`Array.from()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from).

In the same way, defined `toJSON()` and `toString()` will behave as expected in JavaScript, so they
can be used for model serialization:

```javascript
class User extends Record {
  name: string = 'Anonymous';
  age: number = 0;

  toJSON(): Object {
    return { name: this.name, age: this.age };
  }
}

let user = new User({ name: 'Liza', age: 23 });
// > User { name: 'Liza', age: 23 }

JSON.stringify(user);
// > { "name": "Liza", "age": 23 }
```

By default, a model will be serialized to a plain object with all the fields as is, so there is no
need to implement `toJSON()` from example above.

## Contributing

The project is opened for any contributions (features, updates, fixes, etc) and is
[located](https://github.com/alexeyraspopov/dataclass) on GitHub. If you're interested, please check
[the contributing guidelines](https://github.com/alexeyraspopov/dataclass/blob/master/CONTRIBUTING.md).

The project is licensed under the
[MIT](https://github.com/alexeyraspopov/dataclass/blob/master/LICENSE) license.
