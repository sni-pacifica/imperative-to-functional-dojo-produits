export class Identity<T> {

  static of = <T>(t: T) => new Identity(t);

  private constructor(readonly t: T) { }

  map = <U>(f: (t: T) => U) => Identity.of(
    f(this.t)
  );

}

type Lazy<T> = () => T;

export class IdentityLazy<T> {

  static of = <T>(t: Lazy<T>) => new IdentityLazy(t);

  private constructor(readonly t: Lazy<T>) { }

  map = <U>(f: (t: T) => U) => IdentityLazy.of(
    () => f(this.get())
  );

  get = (): T => this.t();

}

const addOne = (x: number): number => {
  console.warn("I must add one to ", x);
  return x + 1;
}

const lazyVal = (x: any) => () => x;

console.info(Identity.of(42));
console.info(Identity.of(42).map(addOne));

console.info(IdentityLazy.of(lazyVal(1)));
console.info(IdentityLazy.of(lazyVal(1)).map(addOne));
console.info(IdentityLazy.of(lazyVal(1)).map(addOne).map(addOne).map(addOne));
const lazyChain =
  IdentityLazy.of(
    lazyVal(1)
  ).map(
    addOne
  ).map(
    addOne
  ).map(
    addOne)
;
// console.info(lazyChain.get());
