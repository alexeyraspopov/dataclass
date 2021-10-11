Syntax sugar that leverages the power of available type systems in TypeScript and JavaScript to
provide an effortless way for defining value objects that are immutable and persistent.

```javascript
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

Read full docs [on the homepage](https://dataclass.js.org/).
