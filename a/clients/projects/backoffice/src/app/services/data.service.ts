import { Injectable } from '@angular/core';
import { IXHR, IHttpClientOptions } from '@mcy/main/interfaces/xhr.interface';
import { XHRService } from '@mcy/main/services/xhr.service';
import { StorageService } from '@mcy/main/services/storage.service';
import { Observable } from 'rxjs';
import { Utils } from '@mcy/main/polyfills';

@Injectable()
export class AgentDataService implements IXHR {
	constructor(private xhr: XHRService, private storage: StorageService) {
	}

	public delete<T>(resource: string, options?: IHttpClientOptions): Observable<T> {
		return this.xhr.delete(resource, this.setOptions(options));
	}

	public get<T>(resource: string, options?: IHttpClientOptions): Observable<T> {
		return this.xhr.get<T>(resource, this.setOptions(options));
	}

	public post<T>(resource: string, options?: IHttpClientOptions): Observable<T> {
		return this.xhr.post(resource, this.setOptions(options));
	}

	public put<T>(resource: string, options?: IHttpClientOptions): Observable<T> {
		return this.xhr.put(resource, this.setOptions(options));
	}

	public patch<T>(resource: string, options?: IHttpClientOptions): Observable<T> {
		return this.xhr.patch(resource, this.setOptions(options));
	}

	public setOptions(options?: IHttpClientOptions): IHttpClientOptions {
		const token = this.storage.getData('agentToken');

		if (!token) {
			this.storage.clear();
			throw new Error('No token found in storage');
		}

		return Utils.mergeDeep(options || {}, {
			headers: {
				// token, TODO: INTEGRATE WHEN SESSION INTEGRATION IS ADDED TO AGENT APP
				// Authorization: 'Bearer ', // CONSULTAR SI ES NECESARIO
			},
		});
	}
}
