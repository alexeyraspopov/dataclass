/* @flow */

import Record from 'dataclass';

class User extends Record {
  name: string = 'Anon';
  age: number = 0;
}

class Admin extends Record {
  nick: string = 'Boo';
}

const user = new User({ name: 'Liza', age: 23, aaaa: false });
const updated = user.copy({ age: 24, isWeird: false });
const isEqual = user.equals(updated);

const admin = new Admin();
const shouldNotBe = admin.equals(user);

console.log(user.name);
