---
home: true
tagline: Data Classes for TypeScript & JavaScript
actions:
  - text: Get Started
    link: /guide/
    type: primary
  - text: GitHub
    link: https://github.com/alexeyraspopov/dataclass
    type: secondary
features:
  - title: Lightweight
    details:
      The library takes less than 500B in your bundle (min+gzip) while still providing a lot of
      flexibility and typings
  - title: Immutable
    details: The power of value objects is based on a simple convention that objects never mutate
  - title: Delightful
    details:
      The project is built with developer experience in mind. Coding should be easy and dataclass is
      here to help
footer:
  Made by <a href="https://twitter.com/alexeyraspopov" rel="noopener noreferrer"
  target="_blank">Alexey Raspopov</a> with ❤️
footerHtml: true
---

```ts:no-line-numbers{3,9,13,19}
import { Data } from "dataclass";

// 1. easily describe your data classes using just language features
class User extends Data {
  name: string = "Anon";
  age: number = 0;
}

// 2. instantiate classes while type systems ensure correctness
let user = User.create({ name: "Liza", age: 23 });
// > User { name: "Liza", age: 23 }

// 3. make changes while benefiting from immutable values
let updated = user.copy({ name: "Ann" });
// > User { name: "Ann", age: 23 }
updated = updated.copy({ name: "Liza" });
// > User { name: "Liza", age: 23 }

// 4. compare objects by their value, not reference
console.log(user === updated, user.equals(updated));
// > false, true
```
