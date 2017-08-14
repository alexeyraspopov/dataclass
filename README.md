## Syntax sugar for data structures leveraging the power of type systems in JavaScript and TypeScript.

To provide an effortless way to define data structures for domain models and data transfer objects that are immutable and persistent.

```bash
npm install dataclass
```

This library provides an abstract class `Record`:

```javascript
import Record from 'dataclass';
```

Which allows to define custom data classes with their set of fields. Assuming, the user is aware of type systems and have one enabled for their project, this library does not do any type checks in runtime. This means less overhead for the things, that have to be preserved in compile time or by a safety net of tests.

The peak of developer experience can be achieved by writing JavaScript that is extended by [class properties](https://github.com/tc39/proposal-class-fields) and [flowtype](https://flow.org). This allows to write a class with a set of fields following by their types and default values:

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

With one small difference: `Record` is generic in TypeScript's typings due to [the issue with types in static fields](https://github.com/Microsoft/TypeScript/issues/5863).

Providing a set of fields defines the class' API. New entity is created by using plain old `new` operator:

```javascript
const userWithCustomValues = new User({ name: 'Liza', age: 23 });
// > User { name: 'Liza', age: 23 }

const userWithDefaultValue = new User({ name: 'Ann' });
// > User { name: 'Ann', age: 0 }
```

Created entity has all the fields' getters that return either custom or default value:

```javascript
// custom value provided to constructor
userWithCustomValues.name === 'Liza';

// default value used from the model definition
userWithDefaultValue.age === 0;
```

Whenever a change should be made, there is `copy()` method that has the same signature as constructor, based on a fields definition:

```javascript
const user = new User({ name: 'Ann' });
// > User { name: 'Ann', age: 0 }

const updated = user.copy({ age: 28 });
// > User { name: 'Ann', age: 28 }
```

This method returns a new entity built upon previous set of values. The target of `copy()` calls is not changed, by the definition of persistence.

Since all the entities of one class are unique by their object reference, comparison operator will always give `false` as a result. To compare the actual properties of the same class' entities, `equals()` method should be used:

```javascript
const userA = new User({ name: 'Ann' });
const userB = new User({ name: 'Ann' });

userA === userB;
// > false

userA.equals(userB);
// > true
```

All the API is fully compatible, so the code looks the same in JavaScript and TypeScript.

If there is no option to use TypeScript or additional JavaScript transformations, plain constructor still can be used:

```javascript
class User extends Record {
  constructor(data) {
    super(data);
    this.name = 'Anonymous';
    this.age = 0;
  }
}
```

Often, models may have a set of additional getters that represent computed values based on raw data. They can be easily described as plain class' methods:

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

Getters may receive arguments, however it is recommended to keep them primitive, so a model [won't know](https://en.wikipedia.org/wiki/Law_of_Demeter) about some others' internals.

### Serialization & Deserialization

In cases where the input data cannot be determined (API requests) or there should be some additional data preparation done, it is recommended to provide custom and agnostic static methods:

```javascript
class User extends Record {
  name: string = 'Anonymous';
  age: number = 0;

  static from(data: Object): User {
    const name: string = data.name;
    const age: number = parseInt(data.age, 10);
    return new User({ name, age });
  }
}

const user = User.from({ name: 'Liza', age: '18', someUnusedFlag: true });
```

That's how native things handle these cases: see [`Array.from()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from).

In the same way, defined `toJSON()` and `toString()` will behave as expected in JavaScript, so they can be used for model serialization:

```javascript
class User extends Record {
  name: string = 'Anonymous';
  age: number = 0;

  toJSON(): Object {
    return { name: this.name,
             age: this.age };
  }
}

const user = new User({ name: 'Liza', age: 23 });
// > User { name: 'Liza', age: 23 }

JSON.stringify(user);
// > { "name": "Liza", "age": 23 }
```

By default, a model will be serialized to a plain object with all the fields as is.

### Inspiration

The implemented concept is heavily inspired by Scala, Kotlin, and Python.

Compare it to Scala:

```scala
case class User(name: String = "Anonymous", age: Int = 0)
```

And Kotlin:

```kotlin
data class User(val name: String = "Anonymous", val age: Int = 0)
```

Both Scala and Kotlin share the same compatible API:

```scala
val user = User(name = "Liza", age = 23)
val updated = user.copy(name = "Ann")

user.equals(update)
```
