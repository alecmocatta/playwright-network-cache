"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheRouteHandler = void 0;
/**
 * Handle caching of particular request route.
 */
const node_path_1 = __importDefault(require("node:path"));
const utils_1 = require("../utils");
const HeadersFile_1 = require("./HeadersFile");
const BodyFile_1 = require("./BodyFile");
const SyntheticApiResponse_1 = require("./SyntheticApiResponse");
const debug_1 = require("../debug");
class CacheRouteHandler {
    constructor(httpMethod, route, options) {
        this.httpMethod = httpMethod;
        this.route = route;
        this.options = options;
        this.cacheDir = '';
        this.lastModified = 0;
        this.req = route.request();
    }
    // eslint-disable-next-line visual/complexity, max-statements
    async handle() {
        if (!this.isRequestMatched()) {
            await this.route.fallback();
            return;
        }
        const { noCache, forceUpdate } = this.options;
        if (noCache) {
            const response = await this.fetchFromServer();
            await this.fulfillRoute(response);
            return;
        }
        this.buildCacheDir();
        this.storeLastModified();
        const useRealRequest = forceUpdate || this.isExpired();
        const response = useRealRequest
            ? await this.fetchFromServer() // prettier-ignore
            : await this.fetchFromCache();
        if (useRealRequest && this.matchHttpStatus(response)) {
            await this.saveResponse(response);
        }
        await this.fulfillRoute(response);
    }
    isRequestMatched() {
        return this.isRequestMatchedByMethod() && this.isRequestMatchedByFn();
    }
    isRequestMatchedByMethod() {
        return this.httpMethod === 'ALL' || this.httpMethod === this.req.method();
    }
    isRequestMatchedByFn() {
        const matchFn = this.options.match || (() => true);
        return matchFn(this.req);
    }
    async fetchFromServer() {
        (0, debug_1.debug)(`Fetching from server: ${this.req.method()} ${this.req.url()}`);
        const overrides = (0, utils_1.toFunction)(this.options.overrides)(this.req);
        return this.route.fetch(overrides);
    }
    async fetchFromCache() {
        (0, debug_1.debug)(`Fetching from cache: ${this.req.method()} ${this.req.url()}`);
        const responseInfo = await new HeadersFile_1.HeadersFile(this.cacheDir).read();
        const bodyFile = new BodyFile_1.BodyFile(this.cacheDir, responseInfo);
        const body = await bodyFile.read();
        return new SyntheticApiResponse_1.SyntheticApiResponse(responseInfo, body);
    }
    isExpired() {
        if (this.options.ttlMinutes === undefined)
            return !this.lastModified;
        const age = Date.now() - this.lastModified;
        return age > this.options.ttlMinutes * 60 * 1000;
    }
    isUpdated() {
        const lastModified = new HeadersFile_1.HeadersFile(this.cacheDir).getLastModified();
        return lastModified > this.lastModified;
    }
    async saveResponse(response) {
        const responseInfo = {
            url: response.url(),
            status: response.status(),
            statusText: response.statusText(),
            headers: response.headers(),
        };
        const body = await response.body();
        // file can be updated by another worker
        if (!this.isUpdated()) {
            (0, debug_1.debug)(`Writing cache: ${this.cacheDir}`);
            new BodyFile_1.BodyFile(this.cacheDir, responseInfo).save(body);
            new HeadersFile_1.HeadersFile(this.cacheDir).save(responseInfo);
        }
        else {
            (0, debug_1.debug)(`Skip writing cache, updated by another worker: ${this.cacheDir}`);
        }
    }
    async fulfillRoute(response) {
        const { modify, modifyJSON } = this.options;
        if (modify) {
            await modify(this.route, response);
        }
        else if (modifyJSON) {
            const origJson = await response.json();
            const resJson = await modifyJSON(origJson);
            await this.route.fulfill({ json: resJson || origJson });
        }
        else {
            await this.route.fulfill({ response });
        }
    }
    buildCacheDir() {
        const { hostname, pathname } = new URL(this.req.url());
        const extraDir = (0, utils_1.toArray)(this.options.extraDir || [])
            .map((item) => {
            return (0, utils_1.toFunction)(item)(this.req);
        })
            .flat();
        const ctx = {
            hostname,
            pathname,
            httpMethod: this.req.method(),
            extraDir,
            httpStatus: this.options.httpStatus,
            req: this.req,
        };
        const dirs = this.options
            .buildCacheDir(ctx)
            .flat()
            .map((dir) => (dir ? (0, utils_1.filenamify)((0, utils_1.trimSlash)(dir.toString())) : ''))
            .filter(Boolean);
        this.cacheDir = node_path_1.default.join(this.options.baseDir, ...dirs);
    }
    matchHttpStatus(response) {
        const { httpStatus } = this.options;
        return httpStatus ? response.status() === httpStatus : response.ok();
    }
    storeLastModified() {
        this.lastModified = new HeadersFile_1.HeadersFile(this.cacheDir).getLastModified();
    }
}
exports.CacheRouteHandler = CacheRouteHandler;
//# sourceMappingURL=index.js.map