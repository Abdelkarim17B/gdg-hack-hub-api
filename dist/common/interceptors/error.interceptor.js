"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let ErrorInterceptor = class ErrorInterceptor {
    constructor() {
        this.logger = new common_1.Logger('ErrorInterceptor');
    }
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.catchError)(error => {
            const ctx = context.switchToHttp();
            const request = ctx.getRequest();
            const status = error.status || 500;
            if (status >= 500) {
                this.logger.error(`Internal Server Error for ${request.method} ${request.url}`, error.stack);
            }
            else if (status >= 400) {
                this.logger.warn(`Client Error (${status}) for ${request.method} ${request.url}: ${error.message}`);
            }
            else {
                this.logger.debug(`Request Error for ${request.method} ${request.url}: ${error.message}`);
            }
            return (0, rxjs_1.throwError)(() => error);
        }));
    }
};
exports.ErrorInterceptor = ErrorInterceptor;
exports.ErrorInterceptor = ErrorInterceptor = __decorate([
    (0, common_1.Injectable)()
], ErrorInterceptor);
//# sourceMappingURL=error.interceptor.js.map