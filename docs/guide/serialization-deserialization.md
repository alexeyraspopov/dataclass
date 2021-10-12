# Serialization & Deserialization

## Serialization

By default, when using
[`JSON.stringify()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify),
an instance will be serialized to a plain object with all the fields as is. This works without any
additional effort

```ts{5-8}
class User extends Data {
  name: string = "Anonymous";
  age: number = 0;

  // implicit behavior, no need to implement
  toJSON(): Object {
    return { name: this.name, age: this.age };
  }
}

let user = User.create({ name: "Liza", age: 23 });
// > User { name: "Liza", age: 23 }

JSON.stringify(user);
// > { "name": "Liza", "age": 23 }
```

## Deserialization

In cases where the input data cannot be determined (API requests) or there should be some additional
data preparation done, it is recommended to provide custom and agnostic static methods:

```ts{5-10}
class User extends Data {
  name: string = "Anonymous";
  age: number = 0;

  // custom method with arbitrary interface
  static from(data: Object): User {
    let name: string = data.name;
    let age: number = parseInt(data.age, 10);
    return User.create({ name, age });
  }
}

let user = User.from({ name: "Liza", age: "18", someUnusedFlag: true });
```

That's how native things handle these cases: see
[`Array.from()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from).
