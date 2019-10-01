export interface LgxThenable<T> {
  then<U>(
    onFulfilled?: (value: T) => U | LgxThenable<U>,
    onRejected?: (error: any) => U | LgxThenable<U>
  ): LgxThenable<U>;
  then<U>(
    onFulfilled?: (value: T) => U | LgxThenable<U>,
    onRejected?: (error: any) => void
  ): LgxThenable<U>;
}
