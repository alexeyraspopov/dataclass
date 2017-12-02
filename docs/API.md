## API Reference

### `Record`

Base class for domain models. Should be extended with a set of class fields that describe the shape of desired model.

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

Once extended, data class can be instantiated with a new data. That's the way to get a unique immutable persistent model.

#### Arguments

 1. `data` (_Object_): POJO which shape satisfy the contract described during class extension. If you use [Flow](https://flow.org), it will warn you about the mistakes.

#### Returns

(_Record_): an instance of your data class with all the defined fields accessible as in the plain object. Properties are read only.

#### Example

```javascript
class Vehicle extends Record {
  model: string = '';
  manufacturer: string = '';
}

const vehicle = new Vehicle({ manufacturer: 'Tesla', model: 'S' });
// > Vehicle { manufacturer: 'Tesla', model: 'S' }

vehicle.manufacturer
// > 'Tesla'
```

### `copy(patch)`

Create new immutable instance based on an existent one. Since properties are read only, that's the way to provide an updated model's fields to a consumer keeping the rest unchanged.

#### Arguments

 1. `patch` (_Record_): POJO that includes new values that you want to change. Properties should satisfy the contract described by the class.

#### Returns

(_Record_): new instance of the same type and with new values.

#### Example

```javascript
class User extends Record {
  name: string = 'Anonymous';
  email: string = 'email@example.com';
}

const user = new User({ name: 'Liza' });
// > User { name: 'Liza', email: 'email@example.com' }

const updated = user.copy({ email: 'liza@example.com' });
// > User { name: 'Liza', email: 'liza@example.com' }
```

### `equals(record)`

Since immutable instances always have not equal references, there should be a way to compare the actual values.

#### Arguments

 1. `record` (_Object_): a record of the same type as a target one.

#### Returns

(_Boolean_): `false` if some field value is not equal in both records. `true` otherwise.

#### Example

```javascript
class Box extends Record {
  size: number = 16;
  color: string = 'red';
}

const first = new Box({ color: 'green' });
const second = new Box({ color: 'blue' });
const third = first.copy({ color: 'blue' });

first === second;
// > false

first === third;
// > false

first.equals(second);
// > false

second.equals(third);
// > true
```
