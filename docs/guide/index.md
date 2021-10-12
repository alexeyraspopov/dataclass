# Introduction

    npm install dataclass

Syntax sugar that leverages the power of available type systems in TypeScript and JavaScript to
provide an effortless way for defining value objects that are immutable and persistent.

Dataclass can be used in browsers, Node.js, and Deno.

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
