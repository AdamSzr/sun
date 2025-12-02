export {}; // <- bardzo ważne!


declare global {
  interface Number {
    plus(val: number): number;
    range(): number[];
    let<R>(this: any, block: (it: any) => R): R;
  }
  interface Object {
    let<R>(this: any, block: (it: any) => R): R;
  }
}

Number.prototype.plus = function (val: number): number {
  return this.valueOf() + val;
};

Number.prototype.range = function (): number[] {
  return Array.from({ length: this.valueOf() }, (_, i) => i);
};


Number.prototype.let = function<R>(this: any, block: (it: any) => R): R {
  return block(this);
};
