/**
 * A factory that returns function that refreshes the auth token when it is expired.
 * @param apiBaseUrl The base URL of the Directus API
 * @param storage The Web Storage to use for the auth token. Defaults to localStorage.
 * @returns A function that refreshes the auth token when it is expired. To be used with addRefreshAuthToAuthProvider or addRefreshAuthToDataProviderAsync.
 */
export declare const directusRefreshAuthToken: (apiBaseUrl: string, storage?: Storage) => () => Promise<void>;
//# sourceMappingURL=directusRefreshAuthToken.d.ts.map