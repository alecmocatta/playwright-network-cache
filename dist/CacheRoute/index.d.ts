/**
 * CacheRoute class manages cached routes for the particular page.
 *
 * Note:
 * The name "CacheRoute" does not fully express the behavior,
 * b/c it's not about only single route.
 * But it's very semantic in usage: cacheRoute.GET('/api/cats')
 */
import { BrowserContext, Page } from '@playwright/test';
import { CacheRouteOptions } from './options';
type UrlPredicate = Parameters<Page['route']>[0];
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'ALL';
type CacheRouteOptionsOrFn = CacheRouteOptions | CacheRouteOptions['modify'];
export type ResolvedCacheRouteOptions = ReturnType<CacheRoute['resolveConstructorOptions']>;
export declare class CacheRoute {
    protected page: Page | BrowserContext;
    options: ResolvedCacheRouteOptions;
    constructor(page: Page | BrowserContext, options?: CacheRouteOptions);
    GET(url: UrlPredicate, optionsOrFn?: CacheRouteOptionsOrFn): Promise<void>;
    POST(url: UrlPredicate, optionsOrFn?: CacheRouteOptionsOrFn): Promise<void>;
    PUT(url: UrlPredicate, optionsOrFn?: CacheRouteOptionsOrFn): Promise<void>;
    PATCH(url: UrlPredicate, optionsOrFn?: CacheRouteOptionsOrFn): Promise<void>;
    DELETE(url: UrlPredicate, optionsOrFn?: CacheRouteOptionsOrFn): Promise<void>;
    HEAD(url: UrlPredicate, optionsOrFn?: CacheRouteOptionsOrFn): Promise<void>;
    ALL(url: UrlPredicate, optionsOrFn?: CacheRouteOptionsOrFn): Promise<void>;
    protected registerCachedRoute(httpMethod: HttpMethod, url: UrlPredicate, optionsOrFn?: CacheRouteOptionsOrFn): Promise<void>;
    protected resolveConstructorOptions(options: CacheRouteOptions): {
        extraDir: (string | ((req: import("@playwright/test").Request) => string | string[]))[];
        baseDir: string;
        match?: ((req: import("@playwright/test").Request) => boolean | void) | undefined;
        httpStatus?: number | undefined;
        ttlMinutes?: number | undefined;
        overrides?: {
            headers?: {
                [key: string]: string;
            } | undefined;
            maxRedirects?: number | undefined;
            maxRetries?: number | undefined;
            method?: string | undefined;
            postData?: any;
            timeout?: number | undefined;
            url?: string | undefined;
        } | ((req: import("@playwright/test").Request) => {
            headers?: {
                [key: string]: string;
            } | undefined;
            maxRedirects?: number | undefined;
            maxRetries?: number | undefined;
            method?: string | undefined;
            postData?: any;
            timeout?: number | undefined;
            url?: string | undefined;
        } | undefined) | undefined;
        modify?: ((route: import("@playwright/test").Route, response: import("@playwright/test").APIResponse) => Promise<unknown>) | undefined;
        modifyJSON?: ((json: any) => any) | undefined;
        noCache?: boolean | undefined;
        forceUpdate?: boolean | undefined;
        buildCacheDir: (ctx: import("./options").BuildCacheDirArg) => (string | number | string[] | undefined)[];
    };
    protected resolveMethodOptions(optionsOrFn?: CacheRouteOptionsOrFn): {
        extraDir: (string | ((req: import("@playwright/test").Request) => string | string[]))[];
        baseDir: string;
        match?: ((req: import("@playwright/test").Request) => boolean | void) | undefined;
        httpStatus?: number | undefined;
        ttlMinutes?: number | undefined;
        overrides?: {
            headers?: {
                [key: string]: string;
            } | undefined;
            maxRedirects?: number | undefined;
            maxRetries?: number | undefined;
            method?: string | undefined;
            postData?: any;
            timeout?: number | undefined;
            url?: string | undefined;
        } | ((req: import("@playwright/test").Request) => {
            headers?: {
                [key: string]: string;
            } | undefined;
            maxRedirects?: number | undefined;
            maxRetries?: number | undefined;
            method?: string | undefined;
            postData?: any;
            timeout?: number | undefined;
            url?: string | undefined;
        } | undefined) | undefined;
        modify?: ((route: import("@playwright/test").Route, response: import("@playwright/test").APIResponse) => Promise<unknown>) | undefined;
        modifyJSON?: ((json: any) => any) | undefined;
        noCache?: boolean | undefined;
        forceUpdate?: boolean | undefined;
        buildCacheDir: (ctx: import("./options").BuildCacheDirArg) => (string | number | string[] | undefined)[];
    };
    protected isPageClosed(): Promise<boolean>;
}
export {};
//# sourceMappingURL=index.d.ts.map