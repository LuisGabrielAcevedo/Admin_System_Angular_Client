import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IHttpClientOptions, IXHR } from '../interfaces/xhr.interface';

@Injectable()
export class XHRServiceMock implements IXHR {

	public get<T>(_resource: string, _options?: IHttpClientOptions): Observable<T> {
		return new Observable();
	}

	public delete<T>(_resource: string, _options?: IHttpClientOptions): Observable<T> {
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
}
