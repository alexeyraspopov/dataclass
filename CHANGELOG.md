# Changelog

## [`v2.1.1`](https://github.com/alexeyraspopov/dataclass/releases/tag/v2.1.1)

- TypeScript typings fix: omit `Data` base class keys in `create()` and `copy()` signatures. Not a
  breaking change since attempt to override these keys would lead to runtime error already. Mainly
  affects autocomplete function of your editor, only showing the keys that can be updated.

## [`v2.1.0`](https://github.com/alexeyraspopov/dataclass/releases/tag/v2.1.0)

- Data instances are now sealed. Adding extra keys via `create()` or `copy()` will result in runtime
  error. If type system is properly utilized, this should not create any issues to existing code.
- Fully rewritten instantiation and copy algorithms with backward compatibility. New implementation
  consumes less memory and uses faster approach in copying objects.
- Fixed dynamic defaults being re-generated after `copy()`
- `copy()` methods now both can omit the argument, creating a referential copy of the instance.
- `equals()` now compares all keys (previously it was checking only the ones overriding defaults).
  The assumed optimizaiton in time didn't pay out and only caused unnecessary complication to
  copying mechanism and higher memory consumtion.

## [`v2.0.0`](https://github.com/alexeyraspopov/dataclass/releases/tag/v2.0.0)

- Dataclass is now licensed under [ISC License](https://en.wikipedia.org/wiki/ISC_license)  
  https://github.com/alexeyraspopov/dataclass/blob/master/LICENSE
- **Breaking:** the utility class has been renamed from `Record` to `Data`
  - "Record" now means a lot of other things in the ecosystem
- **Breaking:** use `.create()` static method instead of `new` operator
  - This fixes the issue with existing browser implementation of class properties
  - The use of `new` operator now throws a runtime error
- **Breaking:** TypeScript classes no longer need to be generic
- **Breaking:** an attempt to mutate properties now throws runtime errors
- **Breaking:** use named import instead of default `import { Data } from "dataclass"`
  - This should fix possible CJS/ESM compatibility issues and allow future API extensions
- **Breaking:** explicit `toJSON()` implementation has been removed, _but the behavior is preserved_
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
