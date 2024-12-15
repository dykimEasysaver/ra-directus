"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.directusHttpClient = void 0;
var react_admin_1 = require("react-admin");
/**
 * A function that returns an HTTP client to use with react-admin and Directus. It adds the Authorization request headers.
 * @param storage The Web Storage to use for the auth token. Defaults to localStorage.
 * @returns An HTTP client to use with react-admin and Directus.
 */
var directusHttpClient = function (storage) {
    if (storage === void 0) { storage = localStorage; }
    return function (url, options) {
        if (options === void 0) { options = {}; }
        var headers = new Headers({ Accept: 'application/json' });
        var auth = JSON.parse(storage.getItem('auth'));
        if (auth && auth.access_token) {
            headers.set('Authorization', "Bearer ".concat(auth.access_token));
        }
        return react_admin_1.fetchUtils.fetchJson(url, __assign(__assign({}, options), { headers: headers }));
    };
};
exports.directusHttpClient = directusHttpClient;
