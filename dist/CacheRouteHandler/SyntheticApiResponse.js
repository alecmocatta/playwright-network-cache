"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyntheticApiResponse = void 0;
const PwApiResponse_1 = require("./PwApiResponse");
// Important to inherit from Playwright's APIResponse,
// because route.fulfill() checks response via instance of:
// https://github.com/microsoft/playwright/blob/main/packages/playwright-core/src/client/network.ts#L364
class SyntheticApiResponse extends PwApiResponse_1.PwApiResponse {
    constructor(info, bodyBuffer) {
        super({ _platform: {} }, { headers: [] });
        this.info = info;
        this.bodyBuffer = bodyBuffer;
    }
    ok() {
        return this.status() >= 200 && this.status() < 300;
    }
    status() {
        return this.info.status;
    }
    statusText() {
        return this.info.statusText;
    }
    url() {
        return this.info.url;
    }
    headers() {
        return this.info.headers;
    }
    headersArray() {
        return Object.entries(this.info.headers).map(([name, value]) => ({ name, value }));
    }
    async body() {
        return this.bodyBuffer;
    }
    async text() {
        return (await this.body()).toString('utf8');
    }
    async json() {
        return JSON.parse(await this.text());
    }
    async dispose() { }
    async [Symbol.asyncDispose]() { }
}
exports.SyntheticApiResponse = SyntheticApiResponse;
//# sourceMappingURL=SyntheticApiResponse.js.map