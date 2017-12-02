Syntax sugar for data structures leveraging the power of type systems in JavaScript and TypeScript

To provide an effortless way to define data structures for domain models and data transfer objects that are immutable and persistent.

```bash
npm install dataclass
```

This library provides an abstract class `Record`:

```javascript
import Record from 'dataclass';
```

Which allows to define custom data classes with their set of fields. Assuming, the user is aware of type systems and have one enabled for their project, this library does not do any type checks in runtime. This means less overhead for the things, that have to be preserved in compile time or by a safety net of tests.
