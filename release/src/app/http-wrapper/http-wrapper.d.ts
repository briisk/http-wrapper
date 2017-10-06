import { Http, Response, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
export declare class HttpWrapper {
    protected http: Http;
    /**
     * Headers used in all requests.
     */
    private headers;
    /**
     * Base url used in all requests.
     */
    protected baseUrl: string;
    /**
     * Response interceptors which are fired on every response
     * @type {Array}
     */
    private responseInterceptors;
    /**
     * Response interceptors which are fired on every response
     * @type {Array}
     */
    private requestInterceptors;
    /**
     * Response interceptors which are fired on every response
     * @type {Array}
     */
    private errorInterceptors;
    /**
     * @param http     Angular Http service.
     */
    constructor(http: Http);
    /**
     * default response interceptor
     * @param resp Response
     * @returns {any}
     */
    protected defaultResponseInterceptor(resp: Response): any;
    /**
     * default request interceptor
     * @param req any
     * @returns {any}
     */
    protected defaultRequestInterceptor(req: any): string;
    /**
     * default error interceptor
     * @param res Response
     * @returns {any}
     */
    protected defaultErrorInterceptor(resp: Response): any;
    /**
     * Sets header for all requests.
     * @param key      A header key.
     * @param value    A value for the key.
     */
    setHeader(key: string, value: string): void;
    /**
     * Gets header by key for all requests.
     * @param key      A header key.
     * @returns value
     */
    getHeaderByKey(key: string): any;
    /**
     * Sets base url for all requests.
     * @param url      A base url
     */
    setBaseUrl(url: string): void;
    /**
     * Add response interceptor to all responses
     * @param interceptor A ResponseInterceptor
     */
    addResponseInterceptor<T, S>(interceptor: (arg: T) => S): void;
    /**
     * Add error interceptor to all responses
     * @param interceptor A ResponseInterceptor
     */
    addErrorInterceptor<T, S>(interceptor: (arg: T) => S): void;
    /**
     * Add reuquest interceptor to all reuqests
     * @param interceptor A RequestInterceptor
     */
    addRequestInterceptor<T, S>(interceptor: (arg: T) => S): void;
    /**
     * Removes header for all requests.
     * @param key      A header key.
     */
    removeHeader(key: string): void;
    /**
     * Performs a request with `get` http method.
     * @param url      An url which is used in a http request.
     * @param options  A request options arguments.
     * @returns        It returns a cold Observable which emits one value (in JavaScript format) from the request.
     */
    get<T>(url: string, options?: RequestOptionsArgs): Observable<T>;
    /**
     * Performs a request with `post` http method.
     * @param url      An url which is used in a http request.
     * @param data     Data (in JavaScript format) which is used in a http request.
     * @param options  A request options arguments.
     * @returns        It returns a cold Observable which emits one value (in JavaScript format) from the request.
     */
    post<T>(url: string, data: Object, options?: RequestOptionsArgs): Observable<T>;
    /**
     * Performs a request with `put` http method.
     * @param url      An url which is used in a http request.
     * @param data     Data (in JavaScript format) which is used in a http request.
     * @param options  A request options arguments.
     * @returns        It returns a cold Observable which emits one value (in JavaScript format) from the request.
     */
    put<T>(url: string, data: Object, options?: RequestOptionsArgs): Observable<T>;
    /**
     * Performs a request with `patch` http method.
     * @param url      An url which is used in a http request.
     * @param data     Data (in JavaScript format) which is used in a http request.
     * @param options  A request options arguments.
     * @returns        It returns a cold Observable which emits one value (in JavaScript format) from the request.
     */
    patch<T>(url: string, data: Object, options?: RequestOptionsArgs): Observable<T>;
    /**
     * Performs a request with `delete` http method.
     * @param url      An url which is used in a http request.
     * @param options  A request options arguments.
     * @returns        It returns a cold Observable which emits one value (in JavaScript format) from the request.
     */
    delete<T>(url: string, options?: RequestOptionsArgs): Observable<T>;
    /**
     * Prepare data for request with interceptors
     * @param data     any
     * @returns        string
     */
    protected prepareData(data: any): string;
    /**
     * Handler which transform response to JavaScript format if response exists.
     * @param resp     Http response
     * @returns        any
     */
    protected responseHandler(resp: Response): any;
    protected errorHandler(error: Response): Observable<any>;
    /**
     * Handler which generate url for all requests. It uses baseUrl if url doesn't start with 'http'' or 'www'.
     * @param url     Url string
     * @returns       Generated url string
     */
    protected generateUrl(url: string): string;
    /**
     * Handler which generate options for all requests from headers.
     * @param options   Request options arguments
     * @returns         Request options arguments
     */
    protected generateOptions(options?: RequestOptionsArgs): RequestOptionsArgs;
}
