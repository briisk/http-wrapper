import { Http, Response, RequestOptionsArgs, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpWrapper {
  /**
   * Headers used in all requests.
   */
  public headers: any = {};

  /**
   * Base url used in all requests.
   */
  protected baseUrl: string = '';

  /**
   * @param http     Angular 2 Http service.
   */
  constructor(protected http: Http) {}

  /**
   * Sets header for all requests.
   * @param key      A header key.
   * @param value    A value for the key.
   */
  setHeader(key: string, value: string) {
    this.headers[key] = value;
  }

  /**
   * Sets base url for all requests.
   * @param url      A base url
   */
  setBaseUrl(url: string) {
    this.baseUrl = url;
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
  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
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
  post(url: string, data: Object, options?: RequestOptionsArgs): Observable<Response> {
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
  put(url: string, data: Object, options?: RequestOptionsArgs): Observable<Response> {
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
  patch(url: string, data: Object, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.put(this.generateUrl(url), JSON.stringify(data), this.generateOptions(options))
      .map(this.responseHandler, this);
  }

  /**
   * Performs a request with `delete` http method.
   * @param url      An url which is used in a http request.
   * @param options  A request options arguments.
   * @returns        It returns a cold Observable which emits one value (in JavaScript format) from the request.
   */
  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.delete(this.generateUrl(url), this.generateOptions(options))
      .map(this.responseHandler, this);
  }

  /**
   * Handler which transform response to JavaScript format if response exists.
   * @param resp     Http response
   * @returns        Http response
   */
  protected responseHandler(resp: Response): Response {
    if (!!resp.text()) {
      return resp.json();
    }
    return resp;
  }

  /**
   * Handler which generate url for all requests. It uses baseUrl if url doesn't start with 'http'' or 'www'.
   * @param url     Url string
   * @returns       Generated url string
   */
  protected generateUrl(url: string): string {
    return !!url.match(/^((?:http(|s):\/\/www\.)|(?:http:\/\/))/) ? url : this.baseUrl + url;
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
