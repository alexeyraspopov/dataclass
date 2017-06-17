```javascript
class User extends Record {
  name: string = 'Anonymous';
  age: ?number = null;
}

const user = new User({ name: 'Liza', age: 23 });
const updated = user.merge({ name: 'Ann' });

user.equals(updated); // false
```
