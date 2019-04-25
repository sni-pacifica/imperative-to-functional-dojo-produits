export class Identity<T> {

  static of = <T>(t: T) => new Identity(t);

  private constructor(readonly t: T) { }

  map = <U>(f: (t: T) => U): Identity<U> => { throw new Error("Not implemented !");}

}

const addOne = (x: number): number => {
  console.warn("I must add one to ", x);
  return x + 1;
}
