import { Observable } from 'rxjs';

export interface IHttpClientOptions {
	headers?: { [key: string]: string | number | null } | null;
	params?: { [key: string]: string | number } | null;
	body?: { [key: string]: any } | null;
	config?: {
		bodyType?: 'json' | 'formData',
		retry?: number;
	};
}

export interface IXHR {
	get<T>(resource: string, options?: IHttpClientOptions): Observable<T>;
	delete<T>(resource: string, options?: IHttpClientOptions): Observable<T>;
	post<T>(resource: string, options?: IHttpClientOptions): Observable<T>;
	put<T>(resource: string, options?: IHttpClientOptions): Observable<T>;
}
