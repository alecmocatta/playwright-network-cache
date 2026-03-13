import { APIResponse, Request, Route } from '@playwright/test';
export type CacheRouteOptions = {
    baseDir?: string;
    extraDir?: string | string[] | ((req: Request) => string | string[]);
    match?: (req: Request) => boolean | void;
    httpStatus?: number;
    ttlMinutes?: number;
    overrides?: RequestOverrides | ((req: Request) => RequestOverrides);
    modify?: (route: Route, response: APIResponse) => Promise<unknown>;
    modifyJSON?: (json: any) => any;
    noCache?: boolean;
    forceUpdate?: boolean;
    /** Function to build cache dir for fine-grained control */
    buildCacheDir?: (ctx: BuildCacheDirArg) => (string | string[] | number | undefined)[];
};
export type BuildCacheDirArg = {
    hostname: string;
    pathname: string;
    httpMethod: string;
    extraDir?: string[];
    httpStatus?: number;
    req: Request;
};
type RequestOverrides = Parameters<Route['fetch']>[0];
export {};
//# sourceMappingURL=options.d.ts.map