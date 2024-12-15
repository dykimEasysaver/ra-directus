import { fetchUtils } from 'react-admin';
/**
 * A function that returns an HTTP client to use with react-admin and Directus. It adds the Authorization request headers.
 * @param storage The Web Storage to use for the auth token. Defaults to localStorage.
 * @returns An HTTP client to use with react-admin and Directus.
 */
export declare const directusHttpClient: (storage?: Storage) => (url: string, options?: fetchUtils.Options) => Promise<{
    status: number;
    headers: Headers;
    body: string;
    json: any;
}>;
//# sourceMappingURL=directusHttpClient.d.ts.map