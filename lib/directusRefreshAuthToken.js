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
exports.directusRefreshAuthToken = void 0;
var jwt_decode_1 = __importDefault(require("jwt-decode"));
var react_admin_1 = require("react-admin");
/**
 * A factory that returns function that refreshes the auth token when it is expired.
 * @param apiBaseUrl The base URL of the Directus API
 * @param storage The Web Storage to use for the auth token. Defaults to localStorage.
 * @returns A function that refreshes the auth token when it is expired. To be used with addRefreshAuthToAuthProvider or addRefreshAuthToDataProviderAsync.
 */
var directusRefreshAuthToken = function (apiBaseUrl, storage) {
    if (storage === void 0) { storage = localStorage; }
    var refreshPromise = null;
    return function () { return __awaiter(void 0, void 0, void 0, function () {
        var auth, access_token, refresh_token, now, expired;
        return __generator(this, function (_a) {
            if (refreshPromise != null) {
                return [2 /*return*/, refreshPromise];
            }
            auth = JSON.parse(storage.getItem('auth'));
            if (!auth) {
                return [2 /*return*/, Promise.reject()];
            }
            access_token = auth.access_token, refresh_token = auth.refresh_token;
            if (!access_token && !refresh_token) {
                return [2 /*return*/, Promise.reject()];
            }
            now = new Date();
            expired = access_token
                ? (0, jwt_decode_1.default)(access_token).exp < now.getTime() / 1000
                : true;
            if (expired) {
                refreshPromise = (function () { return __awaiter(void 0, void 0, void 0, function () {
                    var request, response, data;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                request = new Request("".concat(apiBaseUrl, "/auth/refresh"), {
                                    method: 'POST',
                                    body: JSON.stringify({ refresh_token: refresh_token, mode: 'json' }),
                                    headers: new Headers({
                                        'Content-Type': 'application/json',
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
                                storage.setItem('auth', JSON.stringify(data));
                                return [2 /*return*/];
                        }
                    });
                }); })().finally(function () {
                    refreshPromise = null;
                });
                return [2 /*return*/, refreshPromise];
            }
            return [2 /*return*/];
        });
    }); };
};
exports.directusRefreshAuthToken = directusRefreshAuthToken;
