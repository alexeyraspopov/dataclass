## Syntax sugar for your data structures leveraging the power of type systems in JavaScript and TypeScript

To provide an effortless way to define data structures for domain models and data transfer objects that are immutable and persistent.

    npm install dataclass

### Data Class

Here is how it can be done in JavaScript (using [class properties](https://github.com/tc39/proposal-class-fields) and [flowtype](https://flow.org)):

```javascript
class User extends Record {
  name: string = 'Anonymous';
  age: number = 0;
}
```

Or TypeScript:

```typescript
class User extends Record<User> {
  name: string = 'Anonymous';
  age: number = 0;
}
```

`Record` is generic in TypeScript's typings due to https://github.com/Microsoft/TypeScript/issues/5863.

API is fully compatible, so the code looks the same in JS and TS:

```javascript
const user = new User({ name: 'Liza', age: 23 });
const updated = user.copy({ name: 'Ann' });

user.equals(updated);
```

Without non-standardized JavaScript features:

```javascript
class User extends Record {
  constructor(data) {
    super(data);
    this.name = 'Anonymous';
    this.age = 0;
  }
}
```

And with some getters:

```javascript
class User extends Record {
  name: string = 'Anonymous';
  age: number = 0;

  isAdult() {
    return this.age >= 18;
  }
}
```

### Serialization & Deserialization

If you need data preparation, provide JS-agnostic API:

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

const user = User.from({ name: 'Liza', age: '18' });
```

Whenever you need to serialize data class, just use JS-agnostic API:

```javascript
class User extends Record {
  name: string = 'Anonymous';
  age: number = 0;

  toJSON(): Object {
    return { name: this.name,
             age: this.age };
  }
}
```

### Inspiration

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
