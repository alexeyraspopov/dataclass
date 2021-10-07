# dataclass

    npm install dataclass@beta

Syntax sugar that leverages the power of available type systems in TypeScript and JavaScript to
provide an effortless way for defining value objects that are immutable and persistent.

Read full docs [on the website](https://dataclass.js.org).

```ts
import { Data } from 'dataclass';

class User extends Data {
  name: string = 'Anon';
  age: number = 25;
}

let user = User.create({ name: 'Liza', age: 23 });
// > User { name: "Liza", age: 23 }

let updated = user.copy({ name: 'Ann' });
// > User { name: "Ann", age: 23 }

let isEqual = user.equals(updated);
// > false
```

## Prior Art

The implemented concept is heavily inspired by Scala and Kotlin. Both languages have the
implementation of data classes as a part of their syntax and share similar APIs.

See [Data Classes](https://kotlinlang.org/docs/reference/data-classes.html) in Kotlin (also
[Case Classes](https://docs.scala-lang.org/tour/case-classes.html) in Scala):

```kotlin
data class User(val name: String = "Anonymous", val age: Int = 0)

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

## Contributing

The project is opened for any contributions (features, updates, fixes, etc). If you're interested,
please check
[the contributing guidelines](https://github.com/alexeyraspopov/dataclass/blob/master/CONTRIBUTING.md).

The project is licensed under the
[ISC](https://github.com/alexeyraspopov/dataclass/blob/master/LICENSE) license.
