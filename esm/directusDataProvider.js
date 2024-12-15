var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { stringify } from 'query-string';
import { fetchUtils, } from 'react-admin';
/**
 * Maps react-admin queries to a directus powered REST API
 *
 * @see https://docs.directus.io/reference/introduction.html
 *
 * @example
 *
 * getList          => GET http://my.api.url/items/posts?page=1&limit=10&sort=title&meta=*
 * getOne           => GET http://my.api.url/items/posts/123
 * getManyReference => GET http://my.api.url/items/posts?filter={"author_id":{"_eq":119}}
 * getMany          => GET http://my.api.url/items/posts?filter={"id":{"_in":["123","456","789"]}}
 * create           => POST http://my.api.url/items/posts/123
 * update           => PATCH http://my.api.url/items/posts/123
 * updateMany       => PATCH http://my.api.url/items/posts
 * delete           => DELETE http://my.api.url/items/posts/123
 *
 * @example Basic Usage
 * import * as React from "react";
 * import { Admin, Resource } from 'react-admin';
 * import { directusDataProvider } from 'ra-directus';
 *
 * import { PostList } from './posts';
 *
 * export const App = () => (
 *     <Admin dataProvider={directusDataProvider('http://my-app.directus.app')}>
 *         <Resource name="posts" list={PostList} />
 *     </Admin>
 * );
 *
 * @example With Automatic AuthToken Refresh
 * import { Admin, Resource, addRefreshAuthToDataProvider } from 'react-admin';
 * import { directusDataProvider, directusRefreshAuthToken } from '@react-admin/ra-directus';
 * import { PostList } from './posts';
 *
 * const refreshAuthToken = directusRefreshAuthToken('https://my.api.url');
 * const dataProvider = addRefreshAuthToDataProvider(directusDataProvider('https://my.api.url'), refreshAuthToken);
 *
 * export const App = () => (
 *     <Admin dataProvider={dataProvider}>
 *         <Resource name="posts" list={PostList} />
 *     </Admin>
 * );
 */
export var directusDataProvider = function (apiBaseUrl, httpClient) {
    if (httpClient === void 0) { httpClient = fetchUtils.fetchJson; }
    return ({
        getList: function (resource, params) {
            var _a = params.pagination, page = _a.page, perPage = _a.perPage;
            var _b = params.sort, field = _b.field, order = _b.order;
            var _c = params.filter, queryFilter = _c.q, searchFilter = _c.search, otherFilters = __rest(_c, ["q", "search"]);
            var search = searchFilter || queryFilter;
            var filter = generateFilter(otherFilters);
            var query = {
                search: search,
                filter: JSON.stringify(filter),
                page: page,
                limit: perPage,
                sort: order === 'ASC' ? field : "-".concat(field),
                meta: '*',
            };
            var url = "".concat(getDirectusEndpoint(resource, apiBaseUrl), "?").concat(stringify(query));
            return httpClient(url).then(function (_a) {
                var json = _a.json;
                return ({
                    data: json.data,
                    total: json.meta.filter_count,
                });
            });
        },
        getOne: function (resource, params) {
            return httpClient("".concat(getDirectusEndpoint(resource, apiBaseUrl), "/").concat(params.id)).then(function (_a) {
                var json = _a.json;
                return ({
                    data: json.data,
                });
            });
        },
        getMany: function (resource, params) {
            var filter = {
                id: {
                    _in: params.ids,
                },
            };
            var query = {
                filter: JSON.stringify(filter),
            };
            var url = "".concat(getDirectusEndpoint(resource, apiBaseUrl), "?").concat(stringify(query));
            return httpClient(url).then(function (_a) {
                var json = _a.json;
                return ({ data: json.data });
            });
        },
        getManyReference: function (resource, params) {
            var _a;
            var _b = params.pagination, page = _b.page, perPage = _b.perPage;
            var _c = params.sort, field = _c.field, order = _c.order;
            var _d = params.filter, queryFilter = _d.q, searchFilter = _d.search, otherFilters = __rest(_d, ["q", "search"]);
            var search = searchFilter || queryFilter;
            var filter = (_a = {},
                _a[params.target] = __assign(__assign({}, generateFilter(otherFilters)), { _eq: params.id }),
                _a);
            var query = {
                search: search,
                filter: JSON.stringify(filter),
                page: page,
                limit: perPage,
                sort: order === 'ASC' ? field : "-".concat(field),
                meta: '*',
            };
            var url = "".concat(getDirectusEndpoint(resource, apiBaseUrl), "?").concat(stringify(query));
            return httpClient(url).then(function (_a) {
                var json = _a.json;
                return ({
                    data: json.data,
                    total: json.meta.filter_count,
                });
            });
        },
        update: function (resource, params) {
            return httpClient("".concat(getDirectusEndpoint(resource, apiBaseUrl), "/").concat(params.id), {
                method: 'PATCH',
                body: JSON.stringify(params.data),
            }).then(function (_a) {
                var json = _a.json;
                return ({ data: json.data });
            });
        },
        updateMany: function (resource, params) {
            return httpClient(getDirectusEndpoint(resource, apiBaseUrl), {
                method: 'PATCH',
                body: JSON.stringify({
                    keys: params.ids,
                    data: params.data,
                }),
            }).then(function (_a) {
                var json = _a.json;
                return ({ data: json.data });
            });
        },
        create: function (resource, params) {
            return httpClient(getDirectusEndpoint(resource, apiBaseUrl), {
                method: 'POST',
                body: JSON.stringify(params.data),
            }).then(function (_a) {
                var json = _a.json;
                return ({
                    data: json.data,
                });
            });
        },
        delete: function (resource, params) {
            return httpClient("".concat(getDirectusEndpoint(resource, apiBaseUrl), "/").concat(params.id), {
                method: 'DELETE',
            }).then(function () { return ({ data: params.previousData }); });
        },
        deleteMany: function (resource, params) {
            return httpClient(getDirectusEndpoint(resource, apiBaseUrl), {
                method: 'DELETE',
                body: JSON.stringify(params.ids),
            }).then(function () { return ({ data: params.ids }); });
        },
    });
};
var generateFilter = function (filter) {
    var _a, _b, _c;
    if (Object.keys(filter).length === 0) {
        return undefined;
    }
    var directusFilter = {};
    for (var key in filter) {
        var field = void 0;
        var operator = void 0;
        if (key.includes('/')) {
            _a = key.split('/'), field = _a[0], operator = _a[1];
        }
        else {
            field = key;
            // By default we use _eq operator
            operator = '_eq';
        }
        directusFilter = __assign(__assign({}, directusFilter), (_b = {}, _b[field] = (_c = {},
            _c[operator] = filter[key],
            _c), _b));
    }
    var directusFilterKeys = Object.keys(directusFilter);
    if (directusFilterKeys.length > 1) {
        directusFilter = {
            _and: directusFilterKeys.map(function (key) {
                var _a;
                return (_a = {},
                    _a[key] = directusFilter[key],
                    _a);
            }),
        };
    }
    return directusFilter;
};
var getDirectusEndpoint = function (resource, apiBaseUrl) {
    if (resource.startsWith('directus_')) {
        return "".concat(apiBaseUrl, "/").concat(resource.replace('directus_', ''));
    }
    return "".concat(apiBaseUrl, "/items/").concat(resource);
};
