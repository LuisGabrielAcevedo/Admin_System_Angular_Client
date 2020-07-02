import { Injectable } from '@angular/core';
import { IHttpClientOptions } from '@mcy/main/interfaces/xhr.interface';
import { Observable } from 'rxjs';

@Injectable()
export class AgentDataServiceMock {
	public delete<T>(_resource: string, _options?: IHttpClientOptions): Observable<T> {
		return new Observable();
	}

	public get<T>(_resource: string, _options?: IHttpClientOptions): Observable<T> {
		return new Observable();
	}

	public post<T>(_resource: string, _options?: IHttpClientOptions): Observable<T> {
		return new Observable();
	}

	public put<T>(_resource: string, _options?: IHttpClientOptions): Observable<T> {
		return new Observable();
	}

	public patch<T>(_resource: string, _options?: IHttpClientOptions): Observable<T> {
		return new Observable();
	}

	public setOptions(_options?: IHttpClientOptions): IHttpClientOptions {
		return {}
	}
}
