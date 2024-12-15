"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDirectusProviders = void 0;
var react_admin_1 = require("react-admin");
var directusRefreshAuthToken_1 = require("./directusRefreshAuthToken");
var directusAuthProvider_1 = require("./directusAuthProvider");
var directusHttpClient_1 = require("./directusHttpClient");
var directusDataProvider_1 = require("./directusDataProvider");
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
var getDirectusProviders = function (apiBaseUrl, _a) {
    var _b = _a === void 0 ? {} : _a, storage = _b.storage, getIdentityFullName = _b.getIdentityFullName, httpClient = _b.httpClient;
    var authProvider = (0, directusAuthProvider_1.directusAuthProvider)(apiBaseUrl, {
        storage: storage,
        getIdentityFullName: getIdentityFullName,
    });
    var dataProvider = (0, directusDataProvider_1.directusDataProvider)(apiBaseUrl, httpClient !== null && httpClient !== void 0 ? httpClient : (0, directusHttpClient_1.directusHttpClient)(storage));
    var refreshAuthToken = (0, directusRefreshAuthToken_1.directusRefreshAuthToken)(apiBaseUrl, storage);
    return {
        authProvider: (0, react_admin_1.addRefreshAuthToAuthProvider)(authProvider, refreshAuthToken),
        dataProvider: (0, react_admin_1.addRefreshAuthToDataProvider)(dataProvider, refreshAuthToken),
        httpClient: httpClient,
        refreshAuthToken: refreshAuthToken,
    };
};
exports.getDirectusProviders = getDirectusProviders;
