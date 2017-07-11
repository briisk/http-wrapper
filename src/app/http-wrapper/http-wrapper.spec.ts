import { HttpWrapper } from './http-wrapper';
import {BaseRequestOptions, Http, Response, ResponseOptions, HttpModule, RequestOptionsArgs} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { TestBed, inject } from '@angular/core/testing';

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

  let url;
  let responseData;
  let requestData;
  let rawResponse;
  const authToken = 'someToken';
  const headerName = 'Authorization';
  const baseUrl = 'baseUrl';

  beforeEach(() => {
    url = 'someUrl' + Math.ceil(Math.random() * 10000);
    responseData = { some: 'data' + Math.ceil(Math.random() * 10000) };
    requestData = { some: { request: 'data' + Math.ceil(Math.random() * 10000) } };
    rawResponse = new ResponseOptions({ body: JSON.stringify(responseData) });
    service.setHeader(headerName, authToken);
    service.setBaseUrl(baseUrl);
  });


  function mockBackendHandler(assertions) {
    mockbackend.connections
      .subscribe((connection) => {
        assertions(connection.request);
        connection.mockRespond(new Response(rawResponse));
      });
  }

  function mockInvalidBackendHandler(assertions) {
    mockbackend.connections
      .subscribe((connection) => {
        assertions(connection.request);
        connection.mockRespond(rawResponse);
      });
  }

  describe('get method', () => {
    describe('when there is proper response', function () {
      it('should call proper url and return proper data', (done) => {
        mockBackendHandler((request) => {
          expect(request.url).toBe(baseUrl + url);
          expect(request.headers.get('Authorization')).toBe(authToken);
        });

        service.get(url).subscribe((resp) => {
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

        service.get(url).subscribe((resp) => {
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

          service.get(url, { headers: new Headers() } as RequestOptionsArgs).subscribe((resp) => {
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

        service.get(absoluteUrl).subscribe((resp) => {
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

        service.get(absoluteUrl).subscribe((resp) => {
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

        service.get(absoluteUrl).subscribe((resp) => {
          expect(resp).toEqual(responseData);
          done();
        });
      });
    });

    describe('when there is responseInterceptor added', function () {
      beforeEach(() => {
        service.addInterceptor((resp: any) => resp.some);
      });

      it('should call proper url and return proper data ', (done) => {
        mockBackendHandler((request) => {
          expect(request.url).toBe(baseUrl + url);
          expect(request.headers.get('Authorization')).toBe(authToken);
        });

        service.get(url).subscribe((resp) => {
          expect(resp).toEqual(responseData.some);
          done();
        });
      });
    });
  });

  describe('post method', () => {
    it('should call proper url and return proper data', (done) => {
      mockBackendHandler((request) => {
        expect(request.url).toBe(baseUrl + url);
        expect(request.headers.get('Authorization')).toBe(authToken);
        expect(request.text()).toBe(JSON.stringify(requestData));
      });

      service.post(url, requestData).subscribe((resp) => {
        expect(resp).toEqual(responseData);
        done();
      });
    });
  });

  describe('put method', () => {
    it('should call proper url and return proper data', (done) => {
      mockBackendHandler((request) => {
        expect(request.url).toBe(baseUrl + url);
        expect(request.headers.get('Authorization')).toBe(authToken);
        expect(request.text()).toBe(JSON.stringify(requestData));
      });

      service.put(url, requestData).subscribe((resp) => {
        expect(resp).toEqual(responseData);
        done();
      });
    });
  });

  describe('patch method', () => {
    it('should call proper url and return proper data', (done) => {
      mockBackendHandler((request) => {
        expect(request.url).toBe(baseUrl + url);
        expect(request.headers.get('Authorization')).toBe(authToken);
        expect(request.text()).toBe(JSON.stringify(requestData));
      });

      service.patch(url, requestData).subscribe((resp) => {
        expect(resp).toEqual(responseData);
        done();
      });
    });
  });

  describe('delete method', () => {
    it('should call proper url and return proper data', (done) => {
      mockBackendHandler((request) => {
        expect(request.url).toBe(baseUrl + url);
        expect(request.headers.get('Authorization')).toBe(authToken);
      });

      service.delete(url).subscribe((resp) => {
        expect(resp).toEqual(responseData);
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
});
