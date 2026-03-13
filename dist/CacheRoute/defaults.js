"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaults = void 0;
exports.defaults = {
    baseDir: '.network-cache',
    buildCacheDir: (ctx) => [
        ctx.hostname, // prettier-ignore
        ctx.pathname,
        ctx.httpMethod,
        ctx.extraDir,
        ctx.httpStatus,
    ],
};
//# sourceMappingURL=defaults.js.map