import { HttpWrapper } from './http-wrapper';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
var HttpWrapperModule = (function () {
    function HttpWrapperModule() {
    }
    return HttpWrapperModule;
}());
export { HttpWrapperModule };
HttpWrapperModule.decorators = [
    { type: NgModule, args: [{
                imports: [HttpModule],
                declarations: [],
                providers: [HttpWrapper],
            },] },
];
/** @nocollapse */
HttpWrapperModule.ctorParameters = function () { return []; };
export { HttpWrapper };
//# sourceMappingURL=http-wrapper.module.js.map