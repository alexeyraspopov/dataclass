# Introduction

    npm install dataclass@beta

Syntax sugar that leverages the power of available type systems in TypeScript and JavaScript to
provide an effortless way for defining value objects that are immutable and persistent.

## Prior Art

The implemented concept is heavily inspired by Scala and Kotlin. Both languages have the
implementation of data classes as a part of their syntax and share similar APIs.

See [Data Classes](https://kotlinlang.org/docs/reference/data-classes.html) in Kotlin:

```kotlin:no-line-numbers
data class User(val name: String = "Anonymous", val age: Int = 0)
```

And [Case Classes](https://docs.scala-lang.org/tour/case-classes.html) in Scala:

```scala:no-line-numbers
case class User(name: String = "Anonymous", age: Int = 0)
```

```kotlin:no-line-numbers
val user = User(name = "Liza", age = 23)
val updated = user.copy(name = "Ann")

user.equals(updated)
```

And [Data Classes](https://docs.python.org/3/library/dataclasses.html) in Python:

```python:no-line-numbers
from dataclasses import dataclass, replace

@dataclass
class User:
  name: str = 'Anonymous'
  age: int = 0

user = User(name='Liza', age=23)
updated = replace(user, name='Ann')

user == updated
```
