# Introduction

    npm install dataclass

Syntax sugar that leverages the power of available type systems in TypeScript and JavaScript to
provide an effortless way for defining value objects that are immutable and persistent.

Dataclass can be used in browsers, Node.js, and Deno.

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

## Quick Start

1. **Define data class** — use language features to define the data schema and default values

```ts:no-line-numbers
class Task extends Data {
  contents: string = "";
  completed: boolean = false;
  priority: number = 1;
}
```

2. **Create data objects** — create immutable instance with custom values, fallback to defaults if
   necessary

```ts:no-line-numbers
let taskA = Task.create({
  contents: "Upgrade dependencies",
});
// > Task { contents: "Upgrade dependencies", completed: false, priority: 1 }

let taskB = Task.create({
  contents: "Provide work summary",
  priority: 2,
});
// > Task { contents: "Provide work summary", completed: false, priority: 2 }
```

3. **Read values** — data objects behave just like any other objects, read the properties you
   defined before

```ts:no-line-numbers
let tasks: Array<Task> = [
  /* some Task data objects */
];
tasks.sort((a, b) => (a.priority > b.priority ? -1 : 1));
```

4. **Make copies** — whenever a change is needed, make a copy data object with the new values

```ts:no-line-numbers
function markCompleted(task: Task) {
  return task.copy({ completed: true });
}
```

5. **Compare by values** — compare data objects by their value instead of immutable reference

```ts:no-line-numbers
function isTicketChanged(prev: Task, next: Task) {
  return !prev.equals(next);
}
```

6. Read more in [Getting Started](./getting-started.md) guide, or see deep dive explanation of
   different aspects: [value object equality](./objects-equality.md),
   [serialization/deserialization](./serialization-deserialization.md).

## Prior Art

The implemented concept is heavily inspired by Scala and Kotlin. Both languages have the
implementation of data classes as a part of their syntax and share similar APIs.

See [Data Classes](https://kotlinlang.org/docs/reference/data-classes.html) in Kotlin (also
[Case Classes](https://docs.scala-lang.org/tour/case-classes.html) in Scala):

```kotlin:no-line-numbers
data class User(val name: String = "Anonymous", val age: Int = 0)

val user = User(name = "Liza", age = 23)
val updated = user.copy(name = "Ann")

user.equals(updated)
```

And [Data Classes](https://docs.python.org/3/library/dataclasses.html) in Python:

```python:no-line-numbers
from dataclasses import dataclass, replace

@dataclass
class User:
  name: str = "Anonymous"
  age: int = 0

user = User(name="Liza", age=23)
updated = replace(user, name="Ann")

user == updated
```
