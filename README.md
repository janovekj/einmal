# einmal

A simple function for declaring variables that can be assigned later and only once. This serves few practical purposes, and was mostly a way of getting familiar with the [Proxy API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy).

## Installation

```bash
npm install einmal
```

## Usage

Creating an `einmal` works similar to declaring a variable using `const`, except that it allows for a single reassignment after being declared. It is important to note that `einmal` **does not** make the assigned values immutable. It simply prevents replacing the _reference_ to said value - just like how `const` works.

### Basic example

```javascript
import { einmal } from "einmal";

const thing = einmal();

// first mutation
thing.value = "this is fine"; // all good

// second mutation
thing.value = "this will throw"; // throws
```

### Pitfall - Example with mutable value

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

---

### einmal?

German: once
