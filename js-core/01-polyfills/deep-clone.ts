/**
 * Polyfill: deepClone
 * Handles: Primitives, Objects, Arrays, circular references (WeakMap), Date, RegExp, and Map/Set.
 */

function deepClone(
  value: unknown,
  visited: WeakMap<object, unknown> = new WeakMap(),
): unknown {
  if (value === null || typeof value !== "object") {
    return value;
  }
  if (visited.has(value)) {
    return visited.get(value);
  }

  if (value instanceof Date) {
    return new Date(value.getTime());
  }

  if (value instanceof RegExp) {
    const clonedRegExp = new RegExp(value.source, value.flags);
    clonedRegExp.lastIndex = value.lastIndex;
    return clonedRegExp;
  }

  if (value instanceof Map) {
    const clonedMap = new Map();
    visited.set(value, clonedMap);
    value.forEach((val, key) => {
      clonedMap.set(deepClone(key, visited), deepClone(val, visited));
    });
    return clonedMap;
  }

  if (value instanceof Set) {
    const clonedSet = new Set();
    visited.set(value, clonedSet);

    value.forEach((val) => {
      clonedSet.add(deepClone(val, visited));
    });
    return clonedSet;
  }

  const clone = Array.isArray(value)
    ? []
    : Object.create(Object.getPrototypeOf(value));
  visited.set(value, clone);

  Reflect.ownKeys(value).forEach((key) => {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);

    if (descriptor) {
      if ("value" in descriptor) {
        descriptor.value = deepClone(descriptor.value, visited);
      }
      Object.defineProperty(clone, key, descriptor);
    }
  });

  return clone;
}

export default deepClone;
