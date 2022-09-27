# Caveats

In the world of always changing tooling and evolving specs, it is hard to avoid weird edge cases
that can lead to hours of wasted time. On this page you may find some known caveats and potential
issues when using data classes, and possible ways to resolve or avoid them.

## Optional keys and code compilation

Defining a data class you may find yourself in a situation where a property doesn't have a
reasonable default value. Actual value may be provided during instantiation or the property's value
can be treated as missing.

The most universal approach (i.e. works in any environment for both TypeScript and Flowtype) going
to be the use of `null` as default value:

```ts
class Entity extends Data {
  optionalProp: string | null = null;
}

let entity = Entity.create();
// > Entity { optionalProp: null }

let payload = JSON.stringify(entity);
// > { "optionalProp": null }
```

When using TypeScript, you may want to use optional parameters instead of nullable types, as a less
noisy syntax:

```ts
class Entity extends Data {
  optionalProp?: string;
}

let entity = Entity.create();
// > Entity { optionalProp: undefined }
```

When doing so, you have to consider ensure following: you're using `tsc` version 4.3.2 or higher and
either your compile `target` is `es2022` or
[`useDefineForClassFields` is set to `true`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#the-usedefineforclassfields-flag-and-the-declare-property-modifier).
You may find this flag being set to `false` if some dependencies in your system rely on the old
behavior of class fields initialization. In any other case, optional properties are going to be
missing completely and you won't be able to define them using `create()` method.

**Warning**: During serialization, undefined values do not appear in resulting JSON string:

```ts{8-9}
class Entity extends Data {
  optionalProp?: string;
}

let entity = Entity.create();
// > Entity { optionalProp: undefined }

let payload = JSON.stringify(entity);
// > {}
```

When using Flowtype, it is preferable to stick to nullable types with `null` explicitly set as
default value. Basic Flowtype plugins for Babel going to strip out typings including properties
themselves.

```js
class Entity extends Data {
  optionalProp: ?string = null;
}

let entity = Entity.create();
// > Entity { optionalProp: null }

let payload = JSON.stringify(entity);
// > { "optionalProp": null }
```

## Explicit `this` signature in methods

When using TypeScript, whenever a data class contains a method, that uses `this.copy()` or
`this.equals()`, you may see a typing error. But you have done nothing wrong. There are some
limitations in TypeScript or this library's typings, but that's something you can easily fix:

```ts{4-5}
class Entity extends Data {
  counter: number = 13;

  // set explicit this type to a method that uses other data class methods
  increment(this: Entity) {
    return this.copy({ counter: this.counter + 1 })
  }
}
```
