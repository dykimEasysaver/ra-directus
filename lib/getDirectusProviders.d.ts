import { fetchUtils } from 'react-admin';
import { GetIdentityFullName } from './directusAuthProvider';
/**
 * A function that returns a dataProvider and an authProvider to use react-admin with Directus, configured to support automatic AuthToken refresh.
 * @example Basic Usage
 * import { Admin, Resource } from 'react-admin';
 * import { getDirectusProviders } from '@react-admin/ra-directus';
 * import { PostList } from './posts';
 *
 * const { authProvider, dataProvider } = getDirectusProviders('https://my.api.url');
 *
 * export const App = () => (
 *    <Admin authProvider={authProvider} dataProvider={dataProvider}>
 *        <Resource name="posts" list={PostList} />
 *    </Admin>
 * );
 * @param apiBaseUrl The base URL of the Directus API
 * @param options.storage The Web Storage to use for the auth token. Defaults to localStorage.
 * @param options.getIdentityFullName A function to get the full name of the user. Defaults to `${user.last_name} ${user.first_name}`.
 * @param options.httpClient The HTTP client to use. Defaults to `directusHttpClient`.
 * @returns An object containing the dataProvider, the authProvider, the httpClient and the refreshAuthToken function.
 */
export declare const getDirectusProviders: (apiBaseUrl: string, { storage, getIdentityFullName, httpClient, }?: {
    storage?: Storage;
    getIdentityFullName?: GetIdentityFullName;
    httpClient?: typeof fetchUtils.fetchJson;
}) => {
    authProvider: import("react-admin").AuthProvider;
    dataProvider: import("react-admin").DataProvider;
    httpClient: (url: any, options?: fetchUtils.Options) => Promise<{
        status: number;
        headers: Headers;
        body: string;
        json: any;
    }>;
    refreshAuthToken: () => Promise<void>;
};
//# sourceMappingURL=getDirectusProviders.d.ts.map