import { AuthProvider } from 'react-admin';
import { UserType } from '@directus/sdk';
export type GetIdentityFullName = (user: UserType) => string;
/**
 * An AuthProvider for Directus with support for permissions and identity.
 * @example Basic Usage
 * import { Admin, Resource } from 'react-admin';
 * import { directusAuthProvider } from '@react-admin/ra-directus';
 * import { PostList } from './posts';
 *
 * export const App = () => (
 *    <Admin authProvider={directusAuthProvider('https://my.api.url')}>
 *       <Resource name="posts" list={PostList} />
 *    </Admin>
 * );
 *
 * @example With Session Storage
 * import { Admin, Resource } from 'react-admin';
 * import { directusAuthProvider } from '@react-admin/ra-directus';
 * import { PostList } from './posts';
 *
 * export const App = () => (
 *     <Admin authProvider={directusAuthProvider('https://my.api.url', { storage: sessionStorage })}>
 *         <Resource name="posts" list={PostList} />
 *     </Admin>
 * );
 *
 * @example With Automatic AuthToken Refresh
 * import { Admin, Resource, addRefreshAuthToAuthProvider } from 'react-admin';
 * import { directusAuthProvider, directusRefreshAuthToken } from '@react-admin/ra-directus';
 * import { PostList } from './posts';
 *
 * const refreshAuthToken = directusRefreshAuthToken('https://my.api.url');
 * const authProvider = addRefreshAuthToAuthProvider(directusAuthProvider('https://my.api.url'), refreshAuthToken);
 *
 * export const App = () => (
 *     <Admin authProvider={authProvider}>
 *         <Resource name="posts" list={PostList} />
 *     </Admin>
 * );
 *
 * @param apiBaseUrl The base URL of the Directus API
 * @param options
 * @param options.storage The Web Storage to use for the auth token. Defaults to localStorage.
 * @param options.getIdentityFullName A function to get the full name of the user. Defaults to `${user.last_name} ${user.first_name}`.
 * @returns An AuthProvider for Directus
 */
export declare const directusAuthProvider: (apiBaseUrl: string, { storage, getIdentityFullName, }?: {
    storage?: Storage;
    getIdentityFullName?: GetIdentityFullName;
}) => AuthProvider;
//# sourceMappingURL=directusAuthProvider.d.ts.map