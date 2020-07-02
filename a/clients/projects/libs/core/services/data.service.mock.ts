import { Observable } from 'rxjs';
import { IHttpClientOptions, IXHR } from '@mcy/main/interfaces/xhr.interface';

export class DataServiceMock implements IXHR {
	constructor() {}

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
}
