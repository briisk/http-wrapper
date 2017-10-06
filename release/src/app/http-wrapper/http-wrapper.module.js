import { HttpWrapper } from './http-wrapper';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
var HttpWrapperModule = /** @class */ (function () {
    function HttpWrapperModule() {
    }
    HttpWrapperModule.decorators = [
        { type: NgModule, args: [{
                    imports: [HttpModule],
                    declarations: [],
                    providers: [HttpWrapper],
                },] },
    ];
    /** @nocollapse */
    HttpWrapperModule.ctorParameters = function () { return []; };
    return HttpWrapperModule;
}());
export { HttpWrapperModule };
//# sourceMappingURL=http-wrapper.module.js.map