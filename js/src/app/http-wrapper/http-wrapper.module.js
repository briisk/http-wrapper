"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_wrapper_1 = require("./http-wrapper");
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var HttpWrapperModule = (function () {
    function HttpWrapperModule() {
    }
    return HttpWrapperModule;
}());
HttpWrapperModule = __decorate([
    core_1.NgModule({
        imports: [http_1.HttpModule],
        declarations: [],
        providers: [http_wrapper_1.HttpWrapper],
    })
], HttpWrapperModule);
exports.HttpWrapperModule = HttpWrapperModule;
//# sourceMappingURL=/Users/dako/briisk/ng2/http-wrapper/src/app/http-wrapper/http-wrapper.module.js.map