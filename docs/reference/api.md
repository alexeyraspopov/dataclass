# API Reference

### class `Data`

Base class for domain models. Should be extended with a set of class fields that describe the shape
of desired model.

#### Example

```ts
import { Data } from 'dataclass';

class Project extends Data {
	id: string = '';
	name: string = 'Untitled Project';
	createdBy: string = '';
	createdAt: Date = null;
}
```

### static `create(values)`

Once extended, data class can be instantiated with a new data. That's the way to get a unique
immutable persistent model.

#### Arguments

1.  `values` (_Object_): POJO which shape satisfy the contract described during class extension. If
    you use [Flow](https://flow.org), it will warn you about the mistakes.

#### Returns

(_Data_): an instance of your data class with all the defined fields accessible as in the plain
object. Properties are read only.

#### Example

```ts
class Vehicle extends Data {
	model: string = '';
	manufacturer: string = '';
}

let vehicle = Vehicle.create({ manufacturer: 'Tesla', model: 'S' });
// > Vehicle { manufacturer: 'Tesla', model: 'S' }

vehicle.manufacturer;
// > 'Tesla'
```

### method `copy(values)`

Create new immutable instance based on an existent one. Since properties are read only, that's the
way to provide an updated model's fields to a consumer keeping the rest unchanged.

#### Arguments

1.  `values` (_Data_): POJO that includes new values that you want to change. Properties should
    satisfy the contract described by the class.

#### Returns

(_Data_): new instance of the same type and with new values.

#### Example

```ts
class User extends Data {
	name: string = 'Anonymous';
	email: string = 'email@example.com';
}

let user = User.create({ name: 'Liza' });
// > User { name: 'Liza', email: 'email@example.com' }

let updated = user.copy({ email: 'liza@example.com' });
// > User { name: 'Liza', email: 'liza@example.com' }
```

### method `equals(other)`

Since immutable instances always have not equal references, there should be a way to compare the
actual values.

#### Arguments

1.  `other` (_Object_): a data object of the same class as a target one.

#### Returns

(_Boolean_): `false` if some field value is not
[strictly equal](https://www.ecma-international.org/ecma-262/5.1/#sec-11.9.6) in both instances.
`true` otherwise.

#### Example

```ts
class Box extends Data {
	size: number = 16;
	color: string = 'red';
}

let first = Box.create({ color: 'green' });
let second = Box.create({ color: 'blue' });
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
