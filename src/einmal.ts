type Einmal<T> = {
  value?: T;
};

/**
 * Creates an object with a property `value` that can only be (re)assigned once. The object can optionally be initialized with a default value.
 *
 * **NOTE**: like with the `const` declaration, only *reassignments* are prevented. If the target value is a mutable data structure (e.g. an object or an array) you will still be able to modify its properties - just like with a normal `const` declaration.
 */
export function einmal<T = any>(): Einmal<T> {
  const proxy = new Proxy<Einmal<T>>(
    { value: undefined },
    {
      set: (obj, prop, value) => {
        if (prop !== "value") {
          throw new Error(
            "Only the property 'value' can be accessed of a Mutable Once object"
          );
        }

        const hasBeenAssigned = obj.value !== undefined;

        if (hasBeenAssigned) {
          throw new Error("A Mutable Once object can only be reassigned once");
        }

        obj.value = value;

        return true;
      }
    }
  );

  return proxy;
}
