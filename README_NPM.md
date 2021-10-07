# Data Class

Syntax sugar that leverages the power of available type systems in JavaScript and TypeScript to
provide an effortless way for defining data structures of domain models and data transfer objects
that are immutable and persistent.

```javascript
import { Data } from "dataclass";

class User extends Data {
  name: string = "Anon";
  age: number = 25;
}

let user = User.create({ name: "Liza", age: 23 });
let updated = user.copy(name: "Ann");

user.equals(updated);
```

## Links

Read full docs [on GitHub](https://github.com/alexeyraspopov/dataclass) or
[on the homepage](https://dataclass.js.org/).
