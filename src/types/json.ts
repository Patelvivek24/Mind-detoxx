/**
 * `T` with string/number/boolean literal unions widened to their primitive types.
 * JSON imports are typed with widened primitives (e.g. `"primary"` becomes `string`),
 * so this is the shape a JSON file can be checked against at compile time.
 */
export type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer U)[]
        ? Widen<U>[]
        : T extends object
          ? { [K in keyof T]: Widen<T[K]> }
          : T;

/**
 * Types a static JSON import as `T`.
 *
 * Compile time: the JSON must structurally match `T` (every required field present with
 * the right primitive type), so a malformed data file fails `tsc`/`next build`.
 * It cannot check literal-union membership (e.g. a category name); validate those at
 * runtime with `assertOneOf` where a wrong value would break behaviour.
 */
export function fromJson<T>(data: Widen<T>): T {
  return data as T;
}

/** Throws (failing the build for statically rendered pages) if `value` is not allowed. */
export function assertOneOf<T extends string>(
  value: string,
  allowed: readonly T[],
  context: string
): T {
  if (!(allowed as readonly string[]).includes(value)) {
    throw new Error(`Invalid ${context}: "${value}". Expected one of: ${allowed.join(", ")}`);
  }
  return value as T;
}
