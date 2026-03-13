/// <reference types="node" />
import { ResponseInfo } from './HeadersFile';
export declare class BodyFile {
    private responseInfo;
    path: string;
    constructor(dir: string, responseInfo: ResponseInfo);
    private isJson;
    read(): Promise<Buffer>;
    save(body: Buffer): Promise<void>;
    private ensureDir;
    private getFilename;
}
//# sourceMappingURL=BodyFile.d.ts.map