import { Subject, ReplaySubject, BehaviorSubject, Observable } from 'rxjs';

import { HttpWrapper } from './http-wrapper';
import { BaseRequestOptions, Http, Response, ResponseOptions, HttpModule } from '@angular/http';
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

  beforeEach(() => {
    url = 'someUrl' + Math.ceil(Math.random() * 10000);
    responseData = { some: 'data' + Math.ceil(Math.random() * 10000) };
    requestData = { some: { request: 'data' + + Math.ceil(Math.random() * 10000) } };
  });

  function mockBackendHandler(assertions) {
    mockbackend.connections
      .subscribe((connection) => {
        assertions(connection.request);
        const response = new ResponseOptions({ body: JSON.stringify(responseData) });
        connection.mockRespond(new Response(response));
      });
  }

  describe('get method', () => {
    it('call proper url and return proper data', (done) => {
      mockBackendHandler((request) => {
        expect(request.url).toBe(url);
      });

      service.get(url).subscribe((resp) => {
        expect(resp).toEqual(responseData);
        done();
      });
    });
  });

  describe('post method', () => {
    it('call proper url and return proper data', (done) => {
      mockBackendHandler((request) => {
        expect(request.url).toBe(url);
        expect(request.text()).toBe(JSON.stringify(requestData));
      });

      service.post(url, requestData).subscribe((resp) => {
        expect(resp).toEqual(responseData);
        done();
      });
    });
  });

  describe('put method', () => {
    it('call proper url and return proper data', (done) => {
      mockBackendHandler((request) => {
        expect(request.url).toBe(url);
        expect(request.text()).toBe(JSON.stringify(requestData));
      });

      service.put(url, requestData).subscribe((resp) => {
        expect(resp).toEqual(responseData);
        done();
      });
    });
  });

  describe('patch method', () => {
    it('call proper url and return proper data', (done) => {
      mockBackendHandler((request) => {
        expect(request.url).toBe(url);
        expect(request.text()).toBe(JSON.stringify(requestData));
      });

      service.patch(url, requestData).subscribe((resp) => {
        expect(resp).toEqual(responseData);
        done();
      });
    });
  });

  describe('delete method', () => {
    it('call proper url and return proper data', (done) => {
      mockBackendHandler((request) => {
        expect(request.url).toBe(url);
      });

      service.delete(url).subscribe((resp) => {
        expect(resp).toEqual(responseData);
        done();
      });
    });
  });
});
