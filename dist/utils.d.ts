export declare function prettifyJson(data: string | Record<string, unknown>): string;
/**
 * See: https://github.com/sindresorhus/filenamify
 *
 * There is implementation in Playwright, it replaces more characters with "-", compared to filenamify.
 * At least, " " and ".". But for our case, it's not suitable. We need to keep "." in dir as file extension from URL.
 * E.g. caching "example.com/index.html" creates dir "index.html", not "index-html"
 * So, just replace spaces with "-".
 * See: https://github.com/microsoft/playwright/blob/main/packages/playwright-core/src/utils/fileUtils.ts#L55
 */
export declare function filenamify(s: string, replacement?: string): string;
export declare function toArray<T>(value: T | T[]): T[];
export declare function toFunction<T, K>(value: T | ((...args: K[]) => T)): (...args: K[]) => T;
export declare function trimSlash(s: string): string;
//# sourceMappingURL=utils.d.ts.map