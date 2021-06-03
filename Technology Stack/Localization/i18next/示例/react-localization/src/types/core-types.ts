// import { Action } from '@reduxjs/toolkit';

export type Maybe<T> = T | undefined;

// export interface IRequestAction<T> extends Action<T> {
//   locale: string;
// }

export type DeepReadonly<T> = T extends (infer R)[]
  ? IDeepReadonlyArray<R>
  : T extends Function
  ? T
  : T extends object
  ? DeepReadonlyObject<T>
  : T;

type IDeepReadonlyArray<T> = ReadonlyArray<DeepReadonly<T>>;

type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};
