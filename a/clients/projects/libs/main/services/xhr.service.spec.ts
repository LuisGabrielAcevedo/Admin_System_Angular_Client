import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientModule, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { XHRService } from './xhr.service';
import { CONFIG_MODULE_MAIN } from '../main.config';
import { MainService } from '../main.service';

describe('XHRService', () => {

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				HttpClientModule,
				HttpClientTestingModule
			],
			providers: [
				MainService,
				XHRService,
				{
					provide: CONFIG_MODULE_MAIN,
					useValue: {
						storage: sessionStorage,
						prefix: 'mcykey',
						apiUrl: 'http://test'
					}
				}
			],
		});
	});

	afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
		backend.verify();
	}));

	describe('should', () => {

			it('be exist', () => {
				const service: XHRService = TestBed.get(XHRService);
				expect(service).toBeTruthy();

				expect(XHRService).toBeTruthy();
			});
		}
	);

	describe('interface', async () => {

		describe('GET method', () => {

			it('should be executed', async(inject([XHRService, HttpTestingController],
				(service: XHRService, backend: HttpTestingController) => {

					service.getPlain('api/test').subscribe((next: any) => {
						expect(next.works).toBeTruthy();
					});

					backend.expectOne((req: HttpRequest<any>) => {

						expect(req.url).toEqual('http://test/api/test');
						expect(req.method).toEqual('GET');

						return true;
					}).flush({works: true}, {status: 200, statusText: 'Ok'});

				})));

			it('should be executed on an absolute URL', async(inject([XHRService, HttpTestingController],
				(service: XHRService, backend: HttpTestingController) => {

					service.getPlain('http://resourceURL').subscribe((next: any) => {
						expect(next.works).toBeTruthy();
					});

					backend.expectOne((req: HttpRequest<any>) => {

						expect(req.url).toEqual('http://resourceURL');
						expect(req.method).toEqual('GET');

						return true;
					}).flush({works: true}, {status: 200, statusText: 'Ok'});
				})));
		});

		describe('POST method', () => {

			it('should be executed (post)', async(inject([XHRService, HttpTestingController],
				(service: XHRService, backend: HttpTestingController) => {

					service.postPlain('api/test', {}).subscribe((next: any) => {
						expect(next.works).toBeTruthy();
					});

					backend.expectOne((req: HttpRequest<any>) => {

						expect(req.url).toEqual('http://test/api/test');
						expect(req.method).toEqual('POST');

						return true;
					}).flush({works: true}, {status: 200, statusText: 'Ok'});

				})));

			it('should be executed on an absolute URL (post)', async(inject([XHRService, HttpTestingController],
				(service: XHRService, backend: HttpTestingController) => {

					service.postPlain('http://resourceURL', {}).subscribe((next: any) => {
						expect(next.works).toBeTruthy();
					});

					backend.expectOne((req: HttpRequest<any>) => {

						expect(req.url).toEqual('http://resourceURL');
						expect(req.method).toEqual('POST');

						return true;
					}).flush({works: true}, {status: 200, statusText: 'Ok'});
				})));

			it('should be executed with a body', async(inject([XHRService, HttpTestingController],
				(service: XHRService, backend: HttpTestingController) => {

					const body = {key1: 'value1'};

					service.postPlain('api/test', {body}).subscribe((next: any) => {
						expect(next.works).toBeTruthy();
					});

					backend.expectOne((req: HttpRequest<any>) => {

						expect(req.body).toEqual(body);
						expect(req.method).toEqual('POST');

						return true;
					}).flush({works: true}, {status: 200, statusText: 'Ok'});
				})));

			/**
			 * formData: especial case, it isn't a property, should be a reference
			 */
			it('should be executed with a body with formData', async(inject([XHRService, HttpTestingController],
				(service: XHRService, backend: HttpTestingController) => {

					const formData: FormData = new FormData();
					formData.append('formDataKey1', 'formDataValue1');

					service.postPlain('api/test', {body: formData, config: {bodyType: 'formData'}}).subscribe((next: any) => {
						expect(next.works).toBeTruthy();
					});

					backend.expectOne((req: HttpRequest<any>) => {

						expect(req.body.get('formDataKey1')).toEqual('formDataValue1');
						expect(req.method).toEqual('POST');

						return true;
					}).flush({works: true}, {status: 200, statusText: 'Ok'});
				})));
		});

		describe('PUT method', () => {

			it('should be executed (put)', async(inject([XHRService, HttpTestingController],
				(service: XHRService, backend: HttpTestingController) => {

					service.putPlain('api/test', {}).subscribe((next: any) => {
						expect(next.works).toBeTruthy();
					});

					backend.expectOne((req: HttpRequest<any>) => {

						expect(req.url).toEqual('http://test/api/test');
						expect(req.method).toEqual('PUT');

						return true;
					}).flush({works: true}, {status: 200, statusText: 'Ok'});

				})));
		});

		describe('DELETE method', () => {

			it('should be executed (delete)', async(inject([XHRService, HttpTestingController],
				(service: XHRService, backend: HttpTestingController) => {

					service.deletePlain('api/test', {}).subscribe((next: any) => {
						expect(next.works).toBeTruthy();
					});

					backend.expectOne((req: HttpRequest<any>) => {

						expect(req.url).toEqual('http://test/api/test');
						expect(req.method).toEqual('DELETE');

						return true;
					}).flush({works: true}, {status: 200, statusText: 'Ok'});

				})));
		});

	});

	describe('config: headers', async () => {

		describe('basic behavior', () => {

			beforeEach(() => {
				TestBed.configureTestingModule({
					imports: [
						HttpClientModule,
						HttpClientTestingModule
					],
					providers: [
						XHRService
					]
				});
			});

			it('should be executed with default configuration', async(inject([XHRService, HttpTestingController],
				(service: XHRService, backend: HttpTestingController) => {

					service.getPlain('api/test').subscribe((next: any) => {
						expect(next.works).toBeTruthy();
					});

					backend.expectOne((req: HttpRequest<any>) => {

						expect(req.url).toEqual('http://test/api/test');
						expect(req.method).toEqual('GET');
						expect(req.headers.get('content-type')).toBeDefined();

						return true;
					}).flush({works: true}, {status: 200, statusText: 'Ok'});
				})));

		});

		describe('advance behavior', () => {

			beforeEach(() => {
				TestBed.configureTestingModule({
					imports: [
						HttpClientModule,
						HttpClientTestingModule
					],
					providers: [
						XHRService
					]
				});
			});

			it('should be executed with added header', async(inject([XHRService, HttpTestingController],
				(service: XHRService, backend: HttpTestingController) => {

					service.getPlain('api/test', {headers: {'header-test': 'works'}}).subscribe((next: any) => {
						expect(next.works).toBeTruthy();
					});

					backend.expectOne((req: HttpRequest<any>) => {

						expect(req.url).toEqual('http://test/api/test');
						expect(req.method).toEqual('GET');
						expect(req.headers.get('header-test')).toEqual('works');

						return true;
					}).flush({works: true}, {status: 200, statusText: 'Ok'});
				})));

			it('should be executed with a removed header', async(inject([XHRService, HttpTestingController],
				(service: XHRService, backend: HttpTestingController) => {

					service.getPlain('api/test', {headers: {'content-type': null}}).subscribe((next: any) => {
						expect(next.works).toBeTruthy();
					});

					backend.expectOne((req: HttpRequest<any>) => {

						expect(req.url).toEqual('http://test/api/test');
						expect(req.headers.get('content-type')).toBeNull();
						expect(req.method).toEqual('GET');

						return true;
					}).flush({works: true}, {status: 200, statusText: 'Ok'});
				})));

		});
	});

	describe('config: params', async () => {

		it('should send a parameter via query string', async(inject([XHRService, HttpTestingController],
			(service: XHRService, backend: HttpTestingController) => {

				service.getPlain('api/test', {params: {param1: 'value1'}}).subscribe((next: any) => {
					expect(next.works).toBeTruthy();
				});

				backend.expectOne((req: HttpRequest<any>) => {

					expect(req.urlWithParams).toEqual('http://test/api/test?param1=value1');
					expect(req.method).toEqual('GET');
					expect(req.params.get('param1')).toEqual('value1');

					return true;
				}).flush({works: true}, {status: 200, statusText: 'Ok'});
			})));

		it('should send 2 parameter via query string', async(inject([XHRService, HttpTestingController],
			(service: XHRService, backend: HttpTestingController) => {

				service.getPlain('api/test', {params: {param1: 'value1', param2: 'value2'}}).subscribe((next: any) => {
					expect(next.works).toBeTruthy();
				});

				backend.expectOne((req: HttpRequest<any>) => {

					expect(req.urlWithParams).toEqual('http://test/api/test?param1=value1&param2=value2');
					expect(req.method).toEqual('GET');
					expect(req.params.get('param1')).toEqual('value1');
					expect(req.params.get('param2')).toEqual('value2');

					return true;
				}).flush({works: true}, {status: 200, statusText: 'Ok'});
			})));
	});
});
