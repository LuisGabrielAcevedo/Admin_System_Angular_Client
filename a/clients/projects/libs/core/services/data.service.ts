import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHttpClientOptions, IXHR } from '@mcy/main/interfaces/xhr.interface';
import { XHRService } from '@mcy/main/services/xhr.service';
import { Utils } from '@mcy/main/polyfills';
import { StorageService } from '@mcy/main/services/storage.service';

/**
 * this is as an interceptor but can be more complex
 */
@Injectable()
export class DataService implements IXHR {
	constructor(private xhr: XHRService, private storage: StorageService /*private userProvider: UserService*/) {
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

	private setOptions(options?: IHttpClientOptions): IHttpClientOptions {
		// if (!(this.userProvider.currentUser && this.userProvider.currentUser.token)) {
		// 	// TODO handle it
		// 	throw new Error('User not logged');
		// }

		// add others required fields
		const enterpriseid = this.storage.getData('enterpriseId');
		if (!enterpriseid) {
			this.storage.clear();
			throw new Error('enterpriseId does not send, logout forced');
		}

		return Utils.mergeDeep(options || {}, {
			headers: {
				enterpriseid,
				// Authorization: 'Bearer ', // + this.userProvider.currentUser.token,
			},
		});
	}
}
