"use strict";
/**
 * CacheRoute class manages cached routes for the particular page.
 *
 * Note:
 * The name "CacheRoute" does not fully express the behavior,
 * b/c it's not about only single route.
 * But it's very semantic in usage: cacheRoute.GET('/api/cats')
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheRoute = void 0;
const defaults_1 = require("./defaults");
const CacheRouteHandler_1 = require("../CacheRouteHandler");
const utils_1 = require("../utils");
class CacheRoute {
    constructor(page, options = {}) {
        this.page = page;
        this.options = this.resolveConstructorOptions(options);
    }
    async GET(url, optionsOrFn) {
        await this.registerCachedRoute('GET', url, optionsOrFn);
    }
    async POST(url, optionsOrFn) {
        await this.registerCachedRoute('POST', url, optionsOrFn);
    }
    async PUT(url, optionsOrFn) {
        await this.registerCachedRoute('PUT', url, optionsOrFn);
    }
    async PATCH(url, optionsOrFn) {
        await this.registerCachedRoute('PATCH', url, optionsOrFn);
    }
    async DELETE(url, optionsOrFn) {
        await this.registerCachedRoute('DELETE', url, optionsOrFn);
    }
    async HEAD(url, optionsOrFn) {
        await this.registerCachedRoute('HEAD', url, optionsOrFn);
    }
    async ALL(url, optionsOrFn) {
        await this.registerCachedRoute('ALL', url, optionsOrFn);
    }
    async registerCachedRoute(httpMethod, url, optionsOrFn) {
        await this.page.route(url, async (route) => {
            const options = this.resolveMethodOptions(optionsOrFn);
            try {
                await new CacheRouteHandler_1.CacheRouteHandler(httpMethod, route, options).handle();
            }
            catch (e) {
                // ignore errors -> page can be already closed as route is not used in test
                if (await this.isPageClosed())
                    return;
                throw e;
            }
        });
    }
    resolveConstructorOptions(options) {
        const extraDir = options.extraDir ? (0, utils_1.toArray)(options.extraDir) : [];
        return { ...defaults_1.defaults, ...options, extraDir };
    }
    resolveMethodOptions(optionsOrFn = {}) {
        const methodOptions = typeof optionsOrFn === 'function' ? { modify: optionsOrFn } : optionsOrFn;
        // extraDir is the only prop that is merged, not overwritten
        const extraDir = this.options.extraDir.slice();
        if (methodOptions.extraDir) {
            extraDir.push(...(0, utils_1.toArray)(methodOptions.extraDir));
        }
        return { ...this.options, ...methodOptions, extraDir };
    }
    async isPageClosed() {
        return 'isClosed' in this.page ? this.page.isClosed() : !this.page?.pages().length;
    }
}
exports.CacheRoute = CacheRoute;
//# sourceMappingURL=index.js.map