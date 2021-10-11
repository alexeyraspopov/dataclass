# Migrating from v1 to v2

## The class name and import type has been changed

The library was created in 2017, long ago before
[Records & Tuples proposal](https://github.com/tc39/proposal-record-tuple) was created. The fact
this proposal is moving towards being a part of the language means "Record" as a term gains very
particular meaning for the ecosystem. Besides,
[`Immutable.Record`](https://immutable-js.com/docs/v4.0.0/Record/) and
[TypeScript's Record](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)
could potentially create confusion as well. Thus, the abstract class `Record` has been renamed to
`Data`.

Dataclass v1 exposed a single default export which seemed to work just fine for most of the cases.
However, it can create additional burden for CommonJS code and require some unnecessary tricks from
the bundlers. Thus, Dataclass v2 uses named export.

```diff:no-line-numbers
-import Record from 'dataclass';
+import { Data } from 'dataclass';
```

## Drop TypeScript generic from class definitions

Dataclass v1 required TypeScript classes to be generic due to
[polymorphic `this` for static members issue](https://github.com/Microsoft/TypeScript/issues/5863).
The issue has not been resolved but in Dataclass v2 there was a change in typings that helped
avoiding the issue in the first place. Now, the user's classes don't need to be generic.

```diff:no-line-numbers
-class User extends Record<User> {
+class User extends Data {
  name: string = 'Anon';
}
```

## Use static method `create()` instead of `new` operator

Dataclass v2 uses new implementation for class instantiation due to some browser incompatibilities.

```diff:no-line-numbers
-let user = new User({ name: 'Ann' });
+let user = User.create({ name: 'Ann' });
```

## Ensure no mutations happening in the code

Mutation is not silent _TODO_

## Make sure the dependency is transpiled, if necessary

See [Installation Guide](./installation.md#troubleshooting) for more details.
