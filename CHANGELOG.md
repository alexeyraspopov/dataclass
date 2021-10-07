# Changelog

## [`v2.0.0`](https://github.com/alexeyraspopov/dataclass/releases/tag/v2.0.0)

- **Breaking:** the utility class has been renamed from `Record` to `Data`
  - "Record" now means a lot of other things in the ecosystem
- **Breaking:** use `.create()` static method instead of `new` operator
  - This fixes the issue with existing browser implementation of class properties
  - The use of `new` operator now throws a runtime error
- **Breaking:** TypeScript classes no longer need to be generic
- **Breaking:** an attempt to mutate properties now throws runtime errors
- **Breaking:** use named import instead of default `import { Data } from "dataclass"`
  - This should fix possible CJS/ESM compatibility issues and allow future API extensions
- **Breaking:** library code is no longer transpiled to ES5
  - Unless you support evergreen browsers, you still need to transpile TypeScript or class
    properties so the build step is inevitable. Thus, make sure `dataclass` is transpiled if
    necessary
- Fixed `equals()` algorithm to ensure proper custom values comparison
- Fixed `equals()` algorithm to avoid runtime errors for nullable properties
- Added `sideEffects: false` to `package.json`

## [`v1.2.0`](https://github.com/alexeyraspopov/dataclass/releases/tag/v1.2.0)

- Fixed the ability to subclass records
- Added support for `toJSON()` of nested records
- Ensure `equals()` works for nested records
- Use `valueOf()` as a part of `equals()` algorithm to support complex structures

## [`v1.1.0`](https://github.com/alexeyraspopov/dataclass/releases/tag/v1.1.0)

- Implement default `toJSON()` serialization behavior

## [`v1.0.4`](https://github.com/alexeyraspopov/dataclass/releases/tag/v1.0.4)

- Added support for custom getters

## [`v1.0.3`](https://github.com/alexeyraspopov/dataclass/releases/tag/v1.0.3)

- Fixed Flow typings

## [`v1.0.2`](https://github.com/alexeyraspopov/dataclass/releases/tag/v1.0.2)

- Fixed `copy()` method for TypeScript

## [`v1.0.0`](https://github.com/alexeyraspopov/dataclass/releases/tag/v1.0.0)

- Initial public version
