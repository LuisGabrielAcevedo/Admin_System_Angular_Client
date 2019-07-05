import { HttpClientResponse } from './http-client-response';
import { Thenable } from './types';
export interface HttpClientPromise {
    then<U>(onFulfilled?: (value: HttpClientResponse) => U | Thenable<U>, onRejected?: (error: any) => U | Thenable<U>): Promise<U>;
    then<U>(onFulfilled?: (value: HttpClientResponse) => U | Thenable<U>, onRejected?: (error: any) => void): Promise<U>;
    catch<U>(onRejected?: (error: any) => U | Thenable<U>): Promise<U>;
}
