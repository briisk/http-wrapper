import { HttpWrapper } from './http-wrapper';
import { BaseRequestOptions, Http, Response, ResponseOptions, HttpModule, RequestOptionsArgs } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { TestBed, inject } from '@angular/core/testing';

class MockError extends Response implements Error {
  name: any;
  message: any;
}

describe('Service: HttpWrapper', () => {
  let service: HttpWrapper;
  let mockbackend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ HttpWrapper, MockBackend, BaseRequestOptions,
        { provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ],
      imports: [ HttpModule ]
    });
  });

  beforeEach(inject([MockBackend, HttpWrapper], (_mockbackend, _service) => {
    mockbackend = _mockbackend;
    service = _service;
  }));

  it('should be true', () => {
    expect(service).toBeTruthy();
  });

  function runSpecs(methodName, isBodyIncluded) {
    let url;
    let responseData;
    let requestData;
    let rawResponse;
    let errorData;
    let errorResponse;
    let args;
    const errorStatus = 404;
    const authToken = 'someToken';
    const headerName = 'Authorization';
    const baseUrl = 'baseUrl';

    beforeEach(() => {
      url = 'someUrl' + Math.ceil(Math.random() * 10000);
      responseData = { some: 'data' + Math.ceil(Math.random() * 10000) };
      requestData = { some: { request: 'data' + Math.ceil(Math.random() * 10000) } };
      rawResponse = new ResponseOptions({ body: JSON.stringify(responseData) });
      errorData = { some: { error: 'error' + Math.ceil(Math.random() * 10000) } };
      errorResponse = new ResponseOptions({ body: JSON.stringify(errorData), status: errorStatus });
      service.setHeader(headerName, authToken);
      service.setBaseUrl(baseUrl);
      if (isBodyIncluded) {
        args = [ url, requestData ];
      } else {
        args = [ url ];
      }
    });


    function mockBackendHandler(assertions) {
      mockbackend.connections
        .subscribe((connection) => {
          assertions(connection.request);
          connection.mockRespond(new Response(rawResponse));
        });
    }

    function mockBackendErrorHandler(assertions) {
      mockbackend.connections
        .subscribe((connection) => {
          assertions(connection.request);
          connection.mockError(new MockError(errorResponse));
        });
    }

    function mockInvalidBackendHandler(assertions) {
      mockbackend.connections
        .subscribe((connection) => {
          assertions(connection.request);
          connection.mockRespond(rawResponse);
        });
    }

    function requestAssertions(isBody: boolean) {
      mockBackendHandler((request) => {
        expect(request.url).toBe(baseUrl + url);
        expect(request.headers.get('Authorization')).toBe(authToken);
        if (isBody) {
          expect(request.text()).toBe(JSON.stringify(requestData));
        }
      });
    }

    describe('when there is proper response', function () {
      it('should call proper url and return proper data', (done) => {
        requestAssertions(isBodyIncluded);

        service[methodName](...args).subscribe((resp) => {
          expect(resp).toEqual(responseData);
          done();
        });
      });
    });

    describe('when there is not proper response', function () {
      it('should call proper url and return raw response', (done) => {
        mockInvalidBackendHandler((request) => {
          expect(request.url).toBe(baseUrl + url);
          expect(request.headers.get('Authorization')).toBe(authToken);
        });

        service[methodName](...args).subscribe((resp) => {
          expect(resp).toEqual(rawResponse);
          done();
        });
      });
    });

    describe('when options are passed', function () {
      describe('with empty headers', function () {
        it('should call proper url and return proper response', (done) => {
          mockBackendHandler((request) => {
            expect(request.url).toBe(baseUrl + url);
            expect(request.headers.get('Authorization')).toBe(null);
          });

          service[methodName](...args, { headers: new Headers() } as RequestOptionsArgs).subscribe((resp) => {
            expect(resp).toEqual(responseData);
            done();
          });
        });
      });
    });

    describe('called with absolute urls', function () {
      it('should call proper url without base url and return proper data', (done) => {
        const absoluteUrl = 'http://some.url';
        mockBackendHandler((request) => {
          expect(request.url).toBe(absoluteUrl);
          expect(request.headers.get('Authorization')).toBe(authToken);
        });

        service[methodName](absoluteUrl).subscribe((resp) => {
          expect(resp).toEqual(responseData);
          done();
        });
      });

      it('should call proper url without base url and return proper data', (done) => {
        const absoluteUrl = 'www.some.url';
        mockBackendHandler((request) => {
          expect(request.url).toBe(absoluteUrl);
          expect(request.headers.get('Authorization')).toBe(authToken);
        });

        service[methodName](absoluteUrl).subscribe((resp) => {
          expect(resp).toEqual(responseData);
          done();
        });
      });

      it('should call proper url without base url and return proper data', (done) => {
        const absoluteUrl = 'https://some.url';
        mockBackendHandler((request) => {
          expect(request.url).toBe(absoluteUrl);
          expect(request.headers.get('Authorization')).toBe(authToken);
        });

        service[methodName](absoluteUrl).subscribe((resp) => {
          expect(resp).toEqual(responseData);
          done();
        });
      });
    });

    describe('when there is responseInterceptor added', function () {
      beforeEach(() => {
        service.addResponseInterceptor((resp: any) => resp.some);
      });

      it('should call proper url and return proper data ', (done) => {
        requestAssertions(isBodyIncluded);

        service[methodName](...args).subscribe((resp) => {
          expect(resp).toEqual(responseData.some);
          done();
        });
      });
    });

    describe('when there is an error', function () {
      it('should call proper url and return proper error ', (done) => {
        mockBackendErrorHandler((request) => {
          expect(request.url).toBe(baseUrl + url);
          expect(request.headers.get('Authorization')).toBe(authToken);
        });

        service[methodName](url).subscribe(null, (error) => {
          expect(error).toEqual({
            status: errorStatus,
            data: errorData,
          });
          done();
        });
      });
    });

    describe('when there is an error with custom interceptor', function () {
      beforeEach(() => {
        service.addErrorInterceptor((err: any) => err.data.some);
      });

      it('should call proper url and return proper error ', (done) => {
        mockBackendErrorHandler((request) => {
          expect(request.url).toBe(baseUrl + url);
          expect(request.headers.get('Authorization')).toBe(authToken);
        });

        service[methodName](url).subscribe(null, (error) => {
          expect(error).toEqual(errorData.some);
          done();
        });
      });
    });

    describe('getHeaderByKey', function () {
      it('should return header value', function () {
        expect(service.getHeaderByKey(headerName)).toBe(authToken);
      });
    });

    describe('removeHeader', function () {
      describe('when header is removed', function () {
        beforeEach(() => {
          service.removeHeader(headerName);
        });

        it('should return undefined', function () {
          expect(service.getHeaderByKey(headerName)).toBeUndefined();
        });
      });
    });
  }

  describe('get method', () => {
    runSpecs('get', false);
  });

  describe('post method', () => {
    runSpecs('post', true);
  });

  describe('put method', () => {
    runSpecs('put', true);
  });

  describe('patch method', () => {
    runSpecs('patch', true);
  });

  describe('delete method', () => {
    runSpecs('delete', false);
  });
});
