import { AxiosResponse } from "axios";
import { LgxHttpClientResponse } from "../interfaces/lgx-http-client-response";

export class LgxAxiosHttpClientResponse implements LgxHttpClientResponse {
  private axiosResponse: AxiosResponse;
  constructor(axiosResponse: AxiosResponse) {
    this.axiosResponse = axiosResponse;
  }

  getData(): any {
    return this.axiosResponse.data;
  }
}
