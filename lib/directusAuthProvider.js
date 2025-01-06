"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.directusAuthProvider = void 0;
var react_admin_1 = require("react-admin");
var jwt_decode_1 = __importDefault(require("jwt-decode"));
var DefaultGetIdentityFullName = function (user) {
    return "".concat(user.last_name, " ").concat(user.first_name);
};
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
var directusAuthProvider = function (apiBaseUrl, _a) {
    var _b = _a === void 0 ? {
        storage: localStorage,
        getIdentityFullName: DefaultGetIdentityFullName,
    } : _a, _c = _b.storage, storage = _c === void 0 ? localStorage : _c, _d = _b.getIdentityFullName, getIdentityFullName = _d === void 0 ? DefaultGetIdentityFullName : _d;
    var authProvider = {
        login: function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
            var request, response, data, error_1;
            var username = _b.username, password = _b.password;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        request = new Request("".concat(apiBaseUrl, "/auth/login"), {
                            method: 'POST',
                            body: JSON.stringify({
                                email: username,
                                password: password,
                            }),
                            credentials: 'include',
                            headers: new Headers({ 'Content-Type': 'application/json' }),
                        });
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch(request)];
                    case 2:
                        response = _c.sent();
                        if (response.status < 200 || response.status >= 300) {
                            throw new Error(response.statusText);
                        }
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = (_c.sent()).data;
                        storage.setItem('auth', JSON.stringify(data));
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _c.sent();
                        throw error_1;
                    case 5: return [2 /*return*/];
                }
            });
        }); },
        logout: function () { return __awaiter(void 0, void 0, void 0, function () {
            var auth, access_token, refresh_token, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        auth = JSON.parse(storage.getItem('auth'));
                        if (!auth) {
                            return [2 /*return*/];
                        }
                        access_token = auth.access_token, refresh_token = auth.refresh_token;
                        if (!access_token || !refresh_token) {
                            return [2 /*return*/];
                        }
                        request = new Request("".concat(apiBaseUrl, "/auth/logout"), {
                            method: 'POST',
                            body: JSON.stringify({ refresh_token: refresh_token }),
                            headers: new Headers({ 'Content-Type': 'application/json' }),
                        });
                        return [4 /*yield*/, fetch(request)];
                    case 1:
                        response = _a.sent();
                        if (response.status < 200 || response.status >= 300) {
                            throw new Error(response.statusText);
                        }
                        storage.removeItem('auth');
                        return [2 /*return*/];
                }
            });
        }); },
        checkAuth: function () { return __awaiter(void 0, void 0, void 0, function () {
            var auth;
            return __generator(this, function (_a) {
                auth = JSON.parse(storage.getItem('auth'));
                if (!auth) {
                    throw new react_admin_1.HttpError('', 401);
                }
                return [2 /*return*/];
            });
        }); },
        checkError: function (error) {
            var status = error === null || error === void 0 ? void 0 : error.status;
            if (status === 401 || status === 403) {
                return Promise.reject();
            }
            // other error code (404, 500, etc): no need to log out
            return Promise.resolve();
        },
        getIdentity: function () { return __awaiter(void 0, void 0, void 0, function () {
            var auth, access_token, request, response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        auth = JSON.parse(storage.getItem('auth'));
                        if (!auth) {
                            return [2 /*return*/];
                        }
                        access_token = auth.access_token;
                        request = new Request("".concat(apiBaseUrl, "/users/me"), {
                            method: 'GET',
                            headers: new Headers({
                                'Content-Type': 'application/json',
                                Authorization: "Bearer ".concat(access_token),
                            }),
                        });
                        return [4 /*yield*/, fetch(request)];
                    case 1:
                        response = _a.sent();
                        if (response.status < 200 || response.status >= 300) {
                            throw new react_admin_1.HttpError(response.statusText, response.status);
                        }
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = (_a.sent()).data;
                        return [2 /*return*/, {
                                id: data.id,
                                username: data.username,
                                email_address: data.email_address,
                                nickname: data.nickname,
                                mobile: data.mobile,
                                use_my_fastcode: data.use_my_fastcode,
                                role: data.role,
                                fullName: data.nickname,
                                avatar: data.avatar,
                            }];
                }
            });
        }); },
        getPermissions: function () { return __awaiter(void 0, void 0, void 0, function () {
            var auth, access_token, role, request, response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        auth = JSON.parse(storage.getItem('auth'));
                        if (!auth) {
                            return [2 /*return*/, undefined];
                        }
                        access_token = auth.access_token;
                        if (!access_token) {
                            throw new react_admin_1.HttpError('', 401);
                        }
                        role = (0, jwt_decode_1.default)(access_token).role;
                        request = new Request("".concat(apiBaseUrl, "/roles/").concat(role), {
                            method: 'GET',
                            headers: new Headers({
                                'Content-Type': 'application/json',
                                Authorization: "Bearer ".concat(access_token),
                            }),
                        });
                        return [4 /*yield*/, fetch(request)];
                    case 1:
                        response = _a.sent();
                        if (response.status < 200 || response.status >= 300) {
                            throw new Error(response.statusText);
                        }
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data.name];
                }
            });
        }); },
    };
    return authProvider;
};
exports.directusAuthProvider = directusAuthProvider;
