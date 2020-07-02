import { Injectable } from '@angular/core';
import { Observable, ObservableInput, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TimeoutError } from 'rxjs/internal/util/TimeoutError';
import { catchError, retry, timeout } from 'rxjs/operators';
import { ApiStatusCode, IApiResponseBase, IApiStatusResponse } from '@mcy/core/interfaces/api.interfaces';
import { map } from 'rxjs/operators';
import { Utils } from '../polyfills';
import { MainService } from '../main.service';
import { IHttpClientOptions, IXHR } from '../interfaces/xhr.interface';
import { StorageService } from '@mcy/main/services/storage.service';

@Injectable()
export class XHRService implements IXHR {
	defaultOptions: IHttpClientOptions;

	constructor(private httpClient: HttpClient, private mainService: MainService, private storage: StorageService) {
		this.defaultOptions = {
			headers: {
				accept: 'application/json',
				'content-type': 'application/json; charset=utf-8',
				clientEnv: this.mainService.config.envName,
				clientName: this.mainService.config.appName,
				clientVer: this.mainService.config.appVersion,
				'access-control-allow-origin': '*'
			},
			params: {},
			body: {},
			config: {
				bodyType: 'json',
				retry: 0
			}
		};
	}

	public get<T>(resource: string, options?: IHttpClientOptions): Observable<T> {
		return this.responseInterceptor(this.getPlain(resource, options));
	}

	public delete<T>(resource: string, options?: IHttpClientOptions): Observable<T> {
		return this.responseInterceptor(this.deletePlain(resource, options));
	}

	public post<T>(resource: string, options?: IHttpClientOptions): Observable<T> {
		return this.responseInterceptor(this.postPlain(resource, options));
	}

	public put<T>(resource: string, options?: IHttpClientOptions): Observable<T> {
		return this.responseInterceptor(this.putPlain(resource, options));
	}

	public patch<T>(resource: string, options?: IHttpClientOptions): Observable<T> {
		return this.responseInterceptor(this.patchPlain(resource, options));
	}

	public getPlain<T>(resource: string, options?: IHttpClientOptions): Observable<T> {
		return this.xhr('get', resource, options);
	}

	public deletePlain<T>(resource: string, options?: IHttpClientOptions): Observable<T> {
		return this.xhr('delete', resource, options);
	}

	public postPlain<T>(resource: string, options?: IHttpClientOptions): Observable<T> {
		return this.xhr('post', resource, options);
	}

	public putPlain<T>(resource: string, options?: IHttpClientOptions): Observable<T> {
		return this.xhr('put', resource, options);
	}

	public patchPlain<T>(resource: string, options?: IHttpClientOptions): Observable<T> {
		return this.xhr('patch', resource, options);
	}

	private handleError(err: any): ObservableInput<any> {

		if (err instanceof TimeoutError) {
			logError('Error de timeout', err);
		}
		if (err.status === 400) {
			log('Error de Validación de datos', 'volver a intentar');
		}
		if (err.status === 403) {
			log('Forbidden', 'volver a intentar');
		}

		if (err.status === 429) {
			log('Has sido bloqueado', 'Volver');
		}

		if (err.status === 500) {
			log('Error de servidor', 'Volver a intentar');
		}

		if (err.message) {
			logError(err.message);
		}

		if (err.error!.message) {
			logError(err.error.message);
		}

		return throwError(err);
	}

	private xhr<T>(method: string, resource: string, newOptions?: IHttpClientOptions): Observable<T> {
		// TODO mover luego a data.service.ts
		newOptions = Utils.mergeDeep({headers: {authorization: `Bearer ${this.storage.getData('token')}`}}, newOptions);

		const options = this.prepareHttpClientOptions(this.defaultOptions, newOptions);

		// Si se envia "http" significa que es absoluta, de otra manera concatena la api con el resource
		const endpoint = resource.substring(0, 4) === 'http' ? resource : `${this.mainService.config.apiUrl}/${resource}`;

		return this.httpClient.request<T>(method, endpoint, options.optionsMerged)
		.pipe(
			timeout(this.mainService.config.httpTimeout),
			retry(options.config.retry),
			catchError(this.handleError)
		);
	}

	/**
	 * Para borrar un header, enviar con value en `null`
	 */
	private setHeaders(optionsMerged: any) {
		let headers = new HttpHeaders();
		Object.keys(optionsMerged.headers).forEach((key) => {
			if (optionsMerged.headers[key] !== null) {
				headers = headers.append(key, optionsMerged.headers[key]);
			}
		});

		return headers;
	}

	private responseInterceptor<T>(fn: Observable<T>): Observable<T> {
		// TODO change any to IApiResponseBase
		return fn.pipe(map((value: any) => {
			if (!value) {
				logError('Invalid undefined response');
			} else if (!Array.isArray(value.status)) {
				logError('Invalid status field response');
			}

			value.success = this.filterSuccess(value);
			return value;
		}));
	}

	private filterSuccess(apiResponse: IApiResponseBase): boolean {
		return !!(apiResponse.status.length === 1 && apiResponse.status.find(
				(statusResponse: IApiStatusResponse) => {
					const code = statusResponse.code.split(':');

					if(code.length !== 2){
						logError('Invalid status code response');
					}

					return code[1] === ApiStatusCode.success;
				})
		);
	}

	private prepareHttpClientOptions(previousOptions: IHttpClientOptions, newOptions?: IHttpClientOptions): any {
		const optionsMerged: any = {};

		const options: IHttpClientOptions = Utils.mergeDeep(previousOptions, newOptions);

		optionsMerged.headers = this.setHeaders(options);
		optionsMerged.params = options.params;
		if (options.config!.bodyType === 'json') {
			optionsMerged.body = Utils.isEmpty(options.body) ? undefined : options.body;
		} else {
			// just for formData, you need to send the reference, merged does not work
			if (newOptions!.body) {
				optionsMerged.body = newOptions!.body;
			}
		}

		return {
			optionsMerged,
			config: options.config
		};
	}
}
