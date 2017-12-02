Syntax sugar for data structures leveraging the power of type systems in JavaScript and TypeScript.

To provide an effortless way to define data structures for domain models and data transfer objects that are immutable and persistent.

```bash
npm install dataclass
```

This library provides an abstract class `Record`:

```javascript
import Record from 'dataclass';
```

Which allows to define custom data classes with their set of fields. Assuming, the user is aware of type systems and have one enabled for their project, this library does not do any type checks in runtime. This means less overhead for the things, that have to be preserved in compile time or by a safety net of tests.

## Inspiration

The implemented concept is heavily inspired by [Scala](https://docs.scala-lang.org/tour/case-classes.html), [Kotlin](https://kotlinlang.org/docs/reference/data-classes.html), and [Python](https://pydantic-docs.helpmanual.io/).

Compare it to Scala:

```scala
case class User(name: String = "Anonymous", age: Int = 0)
```

And Kotlin:

```kotlin
data class User(val name: String = "Anonymous", val age: Int = 0)
```

Both Scala and Kotlin share the same compatible API:

```scala
val user = User(name = "Liza", age = 23)
val updated = user.copy(name = "Ann")

user.equals(updated)
```

## Contributing

The project is opened for any contributions (features, updates, fixes, etc) and is [located](https://github.com/alexeyraspopov/dataclass) on GitHub. If you're interested, please check [the contributing guidelines](https://github.com/alexeyraspopov/dataclass/blob/master/CONTRIBUTING.md).

The project is licensed under the [MIT](https://github.com/alexeyraspopov/dataclass/blob/master/LICENSE) license.
