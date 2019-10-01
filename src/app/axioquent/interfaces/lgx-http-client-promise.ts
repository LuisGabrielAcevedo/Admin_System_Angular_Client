import { LgxHttpClientResponse } from "./lgx-http-client-response";
import { LgxThenable } from "./lgx-thenable";

export interface LgxHttpClientPromise {
  then<U>(
    onFulfilled?: (value: LgxHttpClientResponse) => U | LgxThenable<U>,
    onRejected?: (error: any) => U | LgxThenable<U>
  ): Promise<U>;
  then<U>(
    onFulfilled?: (value: LgxHttpClientResponse) => U | LgxThenable<U>,
    onRejected?: (error: any) => void
  ): Promise<U>;
  catch<U>(onRejected?: (error: any) => U | LgxThenable<U>): Promise<U>;
}
