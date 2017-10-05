"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var absoluteURLPattern = /^((?:https:\/\/)|(?:http:\/\/)|(?:www))/;
var HttpWrapper = (function () {
    /**
     * @param http     Angular Http service.
     */
    function HttpWrapper(http) {
        this.http = http;
        /**
         * Headers used in all requests.
         */
        this.headers = {};
        /**
         * Base url used in all requests.
         */
        this.baseUrl = '';
        /**
         * Response interceptors which are fired on every response
         * @type {Array}
         */
        this.responseInterceptors = [];
        /**
         * Response interceptors which are fired on every response
         * @type {Array}
         */
        this.requestInterceptors = [];
        /**
         * Response interceptors which are fired on every response
         * @type {Array}
         */
        this.errorInterceptors = [];
        this.addResponseInterceptor(this.defaultResponseInterceptor);
        this.addRequestInterceptor(this.defaultRequestInterceptor);
        this.addErrorInterceptor(this.defaultErrorInterceptor);
    }
    /**
     * default response interceptor
     * @param resp Response
     * @returns {any}
     */
    HttpWrapper.prototype.defaultResponseInterceptor = function (resp) {
        if (typeof resp.json === 'function') {
            return resp.json();
        }
        /* istanbul ignore next */
        if (typeof resp.text === 'function') {
            return resp.text();
        }
        return resp;
    };
    /**
     * default request interceptor
     * @param req any
     * @returns {any}
     */
    HttpWrapper.prototype.defaultRequestInterceptor = function (req) {
        return JSON.stringify(req);
    };
    /**
     * default error interceptor
     * @param res Response
     * @returns {any}
     */
    HttpWrapper.prototype.defaultErrorInterceptor = function (resp) {
        var data;
        /* istanbul ignore else */
        if (typeof resp.json === 'function') {
            data = resp.json();
        }
        else {
            data = resp.statusText;
        }
        return { status: resp.status, data: data };
    };
    /**
     * Sets header for all requests.
     * @param key      A header key.
     * @param value    A value for the key.
     */
    HttpWrapper.prototype.setHeader = function (key, value) {
        this.headers[key] = value;
    };
    /**
     * Gets header by key for all requests.
     * @param key      A header key.
     * @returns value
     */
    HttpWrapper.prototype.getHeaderByKey = function (key) {
        return this.headers[key];
    };
    /**
     * Sets base url for all requests.
     * @param url      A base url
     */
    HttpWrapper.prototype.setBaseUrl = function (url) {
        this.baseUrl = url;
    };
    /**
     * Add response interceptor to all responses
     * @param interceptor A ResponseInterceptor
     */
    HttpWrapper.prototype.addResponseInterceptor = function (interceptor) {
        this.responseInterceptors = this.responseInterceptors.concat([interceptor]);
    };
    /**
     * Add error interceptor to all responses
     * @param interceptor A ResponseInterceptor
     */
    HttpWrapper.prototype.addErrorInterceptor = function (interceptor) {
        this.errorInterceptors = this.errorInterceptors.concat([interceptor]);
    };
    /**
     * Add reuquest interceptor to all reuqests
     * @param interceptor A RequestInterceptor
     */
    HttpWrapper.prototype.addRequestInterceptor = function (interceptor) {
        this.requestInterceptors = [interceptor].concat(this.requestInterceptors);
    };
    /**
     * Removes header for all requests.
     * @param key      A header key.
     */
    HttpWrapper.prototype.removeHeader = function (key) {
        delete this.headers[key];
    };
    /**
     * Performs a request with `get` http method.
     * @param url      An url which is used in a http request.
     * @param options  A request options arguments.
     * @returns        It returns a cold Observable which emits one value (in JavaScript format) from the request.
     */
    HttpWrapper.prototype.get = function (url, options) {
        return this.http.get(this.generateUrl(url), this.generateOptions(options))
            .map(this.responseHandler, this)
            .catch(this.errorHandler.bind(this));
    };
    /**
     * Performs a request with `post` http method.
     * @param url      An url which is used in a http request.
     * @param data     Data (in JavaScript format) which is used in a http request.
     * @param options  A request options arguments.
     * @returns        It returns a cold Observable which emits one value (in JavaScript format) from the request.
     */
    HttpWrapper.prototype.post = function (url, data, options) {
        var newData = this.prepareData(data);
        return this.http.post(this.generateUrl(url), newData, this.generateOptions(options))
            .map(this.responseHandler, this)
            .catch(this.errorHandler.bind(this));
    };
    /**
     * Performs a request with `put` http method.
     * @param url      An url which is used in a http request.
     * @param data     Data (in JavaScript format) which is used in a http request.
     * @param options  A request options arguments.
     * @returns        It returns a cold Observable which emits one value (in JavaScript format) from the request.
     */
    HttpWrapper.prototype.put = function (url, data, options) {
        var newData = this.prepareData(data);
        return this.http.put(this.generateUrl(url), newData, this.generateOptions(options))
            .map(this.responseHandler, this)
            .catch(this.errorHandler.bind(this));
    };
    /**
     * Performs a request with `patch` http method.
     * @param url      An url which is used in a http request.
     * @param data     Data (in JavaScript format) which is used in a http request.
     * @param options  A request options arguments.
     * @returns        It returns a cold Observable which emits one value (in JavaScript format) from the request.
     */
    HttpWrapper.prototype.patch = function (url, data, options) {
        var newData = this.prepareData(data);
        return this.http.patch(this.generateUrl(url), newData, this.generateOptions(options))
            .map(this.responseHandler, this)
            .catch(this.errorHandler.bind(this));
    };
    /**
     * Performs a request with `delete` http method.
     * @param url      An url which is used in a http request.
     * @param options  A request options arguments.
     * @returns        It returns a cold Observable which emits one value (in JavaScript format) from the request.
     */
    HttpWrapper.prototype.delete = function (url, options) {
        return this.http.delete(this.generateUrl(url), this.generateOptions(options))
            .map(this.responseHandler, this)
            .catch(this.errorHandler.bind(this));
    };
    /**
     * Prepare data for request with interceptors
     * @param data     any
     * @returns        string
     */
    HttpWrapper.prototype.prepareData = function (data) {
        return this.requestInterceptors.reduce(function (acc, interceptor) { return interceptor(acc); }, data);
    };
    /**
     * Handler which transform response to JavaScript format if response exists.
     * @param resp     Http response
     * @returns        any
     */
    HttpWrapper.prototype.responseHandler = function (resp) {
        return this.responseInterceptors.reduce(function (acc, interceptor) { return interceptor(acc); }, resp);
    };
    HttpWrapper.prototype.errorHandler = function (error) {
        return Observable_1.Observable.throw(this.errorInterceptors.reduce(function (acc, interceptor) { return interceptor(acc); }, error));
    };
    /**
     * Handler which generate url for all requests. It uses baseUrl if url doesn't start with 'http'' or 'www'.
     * @param url     Url string
     * @returns       Generated url string
     */
    HttpWrapper.prototype.generateUrl = function (url) {
        return url.match(absoluteURLPattern) ? url : this.baseUrl + url;
    };
    /**
     * Handler which generate options for all requests from headers.
     * @param options   Request options arguments
     * @returns         Request options arguments
     */
    HttpWrapper.prototype.generateOptions = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        if (!options.headers) {
            options.headers = new http_1.Headers();
        }
        Object.keys(this.headers)
            .filter(function (key) { return _this.headers.hasOwnProperty(key); })
            .forEach(function (key) {
            options.headers.append(key, _this.headers[key]);
        });
        return options;
    };
    return HttpWrapper;
}());
HttpWrapper = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], HttpWrapper);
exports.HttpWrapper = HttpWrapper;
//# sourceMappingURL=/Users/dako/briisk/ng2/http-wrapper/src/app/http-wrapper/http-wrapper.js.map