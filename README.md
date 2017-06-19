## Syntax sugar for your data structures leveraging the power of type systems in JavaScript and TypeScript

Here is how it can be done in JavaScript (using [class properties](https://github.com/tc39/proposal-class-fields) and [flowtype](https://flow.org)) or TypeScript (code is fully compatible):

```javascript
class User extends Record {
  name: string = 'Anonymous';
  age: number = 0;
}

const user = new User({ name: 'Liza', age: 23 });
const updated = user.copy({ name: 'Ann' });

user.equals(updated); // false
```

Compare it to Scala:

```scala
case class User(name: String = "Anonymous", age: Int = 0)

val user = User(name = "Liza", age = 23)
val updated = user.copy(name = "Ann")

user.equals(update)
```

And Kotlin:

```kotlin
data class User(val name: String = "Anonymous", val age: Int = 0)

val user = User(name = "Liza", age = 23)
val updated = user.copy(name = "Ann")

user.equals(update)
```
