import { LgxHttpClientResponse } from "./lgx-http-client-response";
import { Thenable } from "./types";

export interface LgxHttpClientPromise {
  then<U>(
    onFulfilled?: (value: LgxHttpClientResponse) => U | Thenable<U>,
    onRejected?: (error: any) => U | Thenable<U>
  ): Promise<U>;
  then<U>(
    onFulfilled?: (value: LgxHttpClientResponse) => U | Thenable<U>,
    onRejected?: (error: any) => void
  ): Promise<U>;
  catch<U>(onRejected?: (error: any) => U | Thenable<U>): Promise<U>;
}
