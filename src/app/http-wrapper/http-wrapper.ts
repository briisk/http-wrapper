import { Http, Response, RequestOptionsArgs, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

type ResponseInterceptor = (response: any) => any;

const absoluteURLPattern = /^((?:https:\/\/)|(?:http:\/\/)|(?:www))/;

@Injectable()
export class HttpWrapper {
  /**
   * Headers used in all requests.
   */
  private headers: any = {};

  /**
   * Base url used in all requests.
   */
  protected baseUrl = '';

  /**
   * Response interceptors which are fired on every response
   * @type {Array}
   */
  private responseInterceptors: Array<ResponseInterceptor> = [];

  /**
   * @param http     Angular Http service.
   */
  constructor(protected http: Http) {
    this.addInterceptor(this.defaultResponseInterceptor);
  }

  /**
   * default response interceptor
   * @param resp Response
   * @returns {any}
   */
  protected defaultResponseInterceptor(resp: Response): any {
    if (typeof resp.json === 'function') {
      return resp.json();
    }

    /* istanbul ignore next */
    if (typeof resp.text === 'function') {
      return resp.text();
    }

    return resp;
  }

  /**
   * Sets header for all requests.
   * @param key      A header key.
   * @param value    A value for the key.
   */
  setHeader(key: string, value: string) {
    this.headers[key] = value;
  }

  /**
   * Gets header by key for all requests.
   * @param key      A header key.
   * @returns value
   */
  getHeaderByKey(key: string) {
    return this.headers[key];
  }

  /**
   * Sets base url for all requests.
   * @param url      A base url
   */
  setBaseUrl(url: string) {
    this.baseUrl = url;
  }

  /**
   * Add response interceptor to all responses
   * @param interceptor A ResponseInterceptor
   */
  addInterceptor<T, S>(interceptor: (arg: T) => S): void {
    this.responseInterceptors = [ ...this.responseInterceptors, interceptor ];
  }

  /**
   * Removes header for all requests.
   * @param key      A header key.
   */
  removeHeader(key: string) {
    delete this.headers[key];
  }

  /**
   * Performs a request with `get` http method.
   * @param url      An url which is used in a http request.
   * @param options  A request options arguments.
   * @returns        It returns a cold Observable which emits one value (in JavaScript format) from the request.
   */
  get<T>(url: string, options?: RequestOptionsArgs): Observable<T> {
    return this.http.get(this.generateUrl(url), this.generateOptions(options))
      .map(this.responseHandler, this);
  }

  /**
   * Performs a request with `post` http method.
   * @param url      An url which is used in a http request.
   * @param data     Data (in JavaScript format) which is used in a http request.
   * @param options  A request options arguments.
   * @returns        It returns a cold Observable which emits one value (in JavaScript format) from the request.
   */
  post<T>(url: string, data: Object, options?: RequestOptionsArgs): Observable<T> {
    return this.http.post(this.generateUrl(url), JSON.stringify(data), this.generateOptions(options))
      .map(this.responseHandler, this);
  }

  /**
   * Performs a request with `put` http method.
   * @param url      An url which is used in a http request.
   * @param data     Data (in JavaScript format) which is used in a http request.
   * @param options  A request options arguments.
   * @returns        It returns a cold Observable which emits one value (in JavaScript format) from the request.
   */
  put<T>(url: string, data: Object, options?: RequestOptionsArgs): Observable<T> {
    return this.http.put(this.generateUrl(url), JSON.stringify(data), this.generateOptions(options))
      .map(this.responseHandler, this);
  }

  /**
   * Performs a request with `patch` http method.
   * @param url      An url which is used in a http request.
   * @param data     Data (in JavaScript format) which is used in a http request.
   * @param options  A request options arguments.
   * @returns        It returns a cold Observable which emits one value (in JavaScript format) from the request.
   */
  patch<T>(url: string, data: Object, options?: RequestOptionsArgs): Observable<T> {
    return this.http.put(this.generateUrl(url), JSON.stringify(data), this.generateOptions(options))
      .map(this.responseHandler, this);
  }

  /**
   * Performs a request with `delete` http method.
   * @param url      An url which is used in a http request.
   * @param options  A request options arguments.
   * @returns        It returns a cold Observable which emits one value (in JavaScript format) from the request.
   */
  delete<T>(url: string, options?: RequestOptionsArgs): Observable<T> {
    return this.http.delete(this.generateUrl(url), this.generateOptions(options))
      .map(this.responseHandler, this);
  }

  /**
   * Handler which transform response to JavaScript format if response exists.
   * @param resp     Http response
   * @returns        any
   */
  protected responseHandler(resp: Response): any {
    return this.responseInterceptors.reduce((acc: any, interceptor: any) => interceptor(acc), resp);
  }

  /**
   * Handler which generate url for all requests. It uses baseUrl if url doesn't start with 'http'' or 'www'.
   * @param url     Url string
   * @returns       Generated url string
   */
  protected generateUrl(url: string): string {
    return url.match(absoluteURLPattern) ? url : this.baseUrl + url;
  }

  /**
   * Handler which generate options for all requests from headers.
   * @param options   Request options arguments
   * @returns         Request options arguments
   */
  protected generateOptions(options: RequestOptionsArgs = {}): RequestOptionsArgs {
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
