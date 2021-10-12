# Objects Equality

The biggest part of dataclasses flexibility is the fact they can be compared by the value they
contain, rather than by the instances reference.

Let's consider an example:

```ts
import { Data } from "dataclass";

class Circle extends Data {
	x: number = 0;
	y: number = 0;
	radius: number = 0;
}

let circleA = Circle.create({ x: 0, y: 10, radius: 2 });
// let's assume the new value is coming from an outside source
let circleB = circleA.copy({ radius: getCircleRadius() });
// …and now we need to check if the value actually changed
let isEqual = circleA.equals(circleB);
```

This guide describes what happens when `target.equals(other)` is being called.

1. The runtime does not check `other` for being the same data class as `target`. This is what
   supposed to be checked by the typing system (TypeScript or Flowtype) even before the code is
   executed.
2. The `equals()` method iterates over the properties of the `target` class and checks whether
   `target` or `other` has a custom value for the key. If at least on of them does, the values need
   to be compared.
3. If `target` has a custom value for a property, but `other` does not, the default value of the
   class will be compared to the custom value
4. If two values are not strictly equal (via `===` comparison), and both of the values are not
   nullish (i.e. neither `undefined` nor `null`), the method checks whether these values are data
   classes that also have `equals()` method. If so, the rest of comparison for these two values is
   delegated to their `equals()` method.
5. If the values are not data classes, `.valueOf()` method is used for both values to extract
   possible primitive representation. The resulting values are compared using `===` operator. If
   result is `false`, `equals()` method returns `false` and skip comparing the rest of the
   properties.
6. If none of changed properties are different in both `target` and `other`, `equals()` method
   returns `true`.

The idea behind this algorithm attempts to find `equals()` of a dataclass properties is that you can
create a data class that will be using another data class as a property.

The reason for using `valueOf()` for other types of properties is the fact that there are some data
types in JavaScript that are actually value objects and should be compared by their value while
having different reference. The prime example of it is `Date`. Instead of directly checking for
values to be instanceof of `Date`, `equals()` method relies on the mechanism of `valueOf()` itself,
allowing you to define custom `valueOf()` methods for any special data types that can be a part of
data classes.
