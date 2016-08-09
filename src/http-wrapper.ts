import { Http, Response, RequestOptionsArgs, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpWrapper {
  headers = {};

  constructor(protected http: Http) {}

  setHeader(key: string, value: string) {
    this.headers[key] = value;
  }

  removeHeader(key: string) {
    delete this.headers[key];
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.get(this.generateUrl(url), this.generateOptions(options))
      .map(this.responseHandler, this);
  }

  post(url: string, data: Object, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.post(this.generateUrl(url), JSON.stringify(data), this.generateOptions(options))
      .map(this.responseHandler, this);
  }

  put(url: string, data: Object, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.put(this.generateUrl(url), JSON.stringify(data), this.generateOptions(options))
      .map(this.responseHandler, this);
  }

  patch(url: string, data: Object, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.put(this.generateUrl(url), JSON.stringify(data), this.generateOptions(options))
      .map(this.responseHandler, this);
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.delete(this.generateUrl(url), this.generateOptions(options))
      .map(this.responseHandler, this);
  }

  private responseHandler(resp: Response): Response {
    if (!!resp.text()) {
      return resp.json();
    }
    return resp;
  }

  private generateUrl(url: string): string {
    return ['http', 'www'].some((item) => url.indexOf(item) > -1) ? url : APIURL + url;
  }

  private generateOptions(options) {
    if (!options) {
      options = {};
    }
    if (!options.headers) {
      options.headers = new Headers();
    }

    Object.keys(this.headers)
      .filter((key) => this.headers.hasOwnProperty(key))
      .forEach((key) => {
        options.headers.append(key, this.headers[key]);
      });

    return options;
  }
}
