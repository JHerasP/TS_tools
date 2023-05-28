type keyOf<T> = keyof T & (string | number);

/**
 * Obtain the key of an object looping through the depper levels.
 * @warning Do not use with self reference types.
 * @param T
 * @returns "parentKey.childKey.grandChildKey"
 */
export type NestedKeyOf<Obj extends object, KeyInObj extends keyOf<Obj> = keyOf<Obj>> = {
  [Key in keyOf<Obj>]: getNested<Obj, Key>;
}[KeyInObj];

type getNested<Obj, Key extends keyOf<Obj>> = Obj[Key] extends object
  ? `${Key}` | `${Key}.${NestedKeyOf<Obj[Key]>}`
  : `${Key}`;

/**
 * Obtain the type of an property looping through the depper levels.
 * @warning Do not use with self reference types.
 * @param Obj Object
 * @param Key key of Obj
 * @returns type
 */
export type NestedTypeOf<Obj extends object, Path extends NestedKeyOf<Obj>> = Path extends keyOf<Obj>
  ? Obj[Path]
  : deepPath<Obj, Path>;

type NestedTypeOfChild<Obj, Path extends string> = Path extends keyOf<Obj> ? Obj[Path] : deepPath<Obj, Path>;

type deepPath<Obj, Path> = Path extends `${infer Root}.${infer Path}` ? goDeeper<Obj, Root, Path> : never;

type goDeeper<Obj, Root, Path extends string> = Root extends keyOf<Obj> ? NestedTypeOfChild<Obj[Root], Path> : never;
