import { einmal } from "./einmal";

describe("createMutableOnce", () => {
  it("should work", () => {
    const mut = einmal<string>();

    // value should be undefined when initialized
    expect(mut.value).toBeUndefined();

    const newValue = "a new value";

    // should allow the first mutation
    expect(() => {
      mut.value = newValue;
    }).not.toThrow();

    // should be able to access the new value
    expect(mut.value).toBe(newValue);

    // should throw an error if mutated more than once
    expect(() => {
      mut.value = newValue;
    }).toThrow();
  });
});
