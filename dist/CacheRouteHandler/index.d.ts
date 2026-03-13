import { Route } from '@playwright/test';
import { HttpMethod, ResolvedCacheRouteOptions } from '../CacheRoute';
export declare class CacheRouteHandler {
    private httpMethod;
    private route;
    private options;
    private req;
    private cacheDir;
    private lastModified;
    constructor(httpMethod: HttpMethod, route: Route, options: ResolvedCacheRouteOptions);
    handle(): Promise<void>;
    private isRequestMatched;
    private isRequestMatchedByMethod;
    private isRequestMatchedByFn;
    private fetchFromServer;
    private fetchFromCache;
    private isExpired;
    private isUpdated;
    private saveResponse;
    private fulfillRoute;
    private buildCacheDir;
    private matchHttpStatus;
    private storeLastModified;
}
//# sourceMappingURL=index.d.ts.map