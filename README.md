# einmal

A simple function for declaring variables that can be assigned later and only once.

## Installation

```bash
npm install einmal
```

## Usage

`einmal` works kindof the same way as using `const`, except that it allows for a single reassignment after being declared. It is important to note that `einmal` **does not** make the assigned values immutable. It simply prevents replacing the _reference_ to said value - just like how `const` works.

### Basic example

```javascript
import { einmal } from "einmal";

const thing = einmal();

// first mutation
thing.value = "this is fine"; // all good

// second mutation
thing.value = "this will throw"; // throws
```

### Pitfall! Example with mutable value

```javascript
const thing = einmal();

thing.value = { name: "Bob", age: 31 }; // so far so good

// also fine, because we're modifying
// a property of our target - we're not
// changing the reference held by our thing
thing.value.name = "Alice";
```

### With types

`einmal` is written in TypeScript and offers opt-in strong typing for the `einmal` value.

```typescript
type Person = {
  name: string;
  age: number;
};

const thing = einmal<Person>();
```

`thing` is of type `Einmal<Person>`. Continued:

```typescript
console.log(thing.value.age); // error: value might be undefined

thing.value = { name: "John", age: "yes" }; // also error, since age should be a number
```

## Motivation

Mainly because I wanted to learn how [Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) work, but also because there may be some cases where you want to declare a variable to be initialized later, but only once.

Consider the following contrived example:

```javascript
let thing;
if (someCondition) {
  thing = 1;
} else if (anotherCondition || something) {
  if (that === somethingElse) {
    thing = 2;
  } else {
    thing = someComputation(123);
  }
} else {
  thing = null;
}

...

// some other place in the code
thing = "cat"; // legal, but may break something somewhere else
```

In most cases you would probably just refactor this into a separate function so it becomes:

```javascript
function determineThing(...) {
  if (someCondition) {
    return 1;
  }
  if (anotherCondition || something) {
    return that === somethingElse ? 2 : someComputation(123)
  }

  return null;
}

const thing = determineThing(...)
```

But `einmal` allows you to be lazy and write your stuff like:

```javascript
const thing = einmal();
if (someCondition) {
  thing.value = 1;
} else if (anotherCondition || something) {
  if (that === somethingElse) {
    thing.value = 2;
  } else {
    thing.value = someComputation(123);
  }
}

// some other place in the code
thing.value = "cat"; // will crash
```

---

### ...einmal?

German: once
