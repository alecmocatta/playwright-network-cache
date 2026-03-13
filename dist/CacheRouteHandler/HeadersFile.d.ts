export type ResponseInfo = {
    url: string;
    status: number;
    statusText: string;
    headers: Record<string, string>;
};
export declare class HeadersFile {
    path: string;
    constructor(dir: string);
    getLastModified(): number;
    read(): Promise<ResponseInfo>;
    save(responseInfo: ResponseInfo): void;
    private ensureDir;
    private stat;
}
//# sourceMappingURL=HeadersFile.d.ts.map