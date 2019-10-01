import { LgxHttpClientResponse } from "../interfaces/lgx-http-client-response";
import { AxiosPromise } from "axios";
import { LgxHttpClientPromise } from "../interfaces/lgx-http-client-promise";
import { LgxAxiosHttpClientResponse } from "./lgx-axios-http-client-response";
import { LgxThenable } from "../interfaces/lgx-thenable";

export class LgxAxiosHttpClientPromise implements LgxHttpClientPromise {
  private axiosPromise: AxiosPromise;

  constructor(axiosPromise: AxiosPromise) {
    this.axiosPromise = axiosPromise;
  }

  then<U>(
    onFulfilled?: (value: LgxHttpClientResponse) => LgxThenable<U> | U,
    onRejected?: (error: any) => LgxThenable<U> | U
  ): Promise<U>;
  then<U>(
    onFulfilled?: (value: LgxHttpClientResponse) => LgxThenable<U> | U,
    onRejected?: (error: any) => void
  ): Promise<U> {
    const wrappedOnFulfilled =
      onFulfilled !== undefined
        ? (axiosResponse: any) =>
            onFulfilled(new LgxAxiosHttpClientResponse(axiosResponse))
        : undefined;
    return <Promise<U>>this.axiosPromise.then(wrappedOnFulfilled, onRejected);
  }

  catch<U>(onRejected?: (error: any) => LgxThenable<U> | U): Promise<U> {
    return <Promise<U>>this.axiosPromise.catch(onRejected);
  }
}
