/// <reference types="node" />
/**
 * Class representing cached response in Playwright's APIResponse interface.
 */
import { APIResponse } from '@playwright/test';
import { PwApiResponse } from './PwApiResponse';
import { ResponseInfo } from './HeadersFile';
export declare class SyntheticApiResponse extends PwApiResponse implements APIResponse {
    private info;
    private bodyBuffer;
    constructor(info: ResponseInfo, bodyBuffer: Buffer);
    ok(): boolean;
    status(): number;
    statusText(): string;
    url(): string;
    headers(): Record<string, string>;
    headersArray(): {
        name: string;
        value: string;
    }[];
    body(): Promise<Buffer>;
    text(): Promise<string>;
    json(): Promise<any>;
    dispose(): Promise<void>;
    [Symbol.asyncDispose](): Promise<void>;
}
//# sourceMappingURL=SyntheticApiResponse.d.ts.map