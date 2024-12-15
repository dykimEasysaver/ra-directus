export * from './directusAuthProvider';
export * from './directusDataProvider';
export * from './directusHttpClient';
export * from './directusRefreshAuthToken';
export * from './getDirectusProviders';
export declare const addRefreshAuthToAuthProvider: <AuthProviderType extends import("react-admin").AuthProvider = import("react-admin").AuthProvider>(provider: AuthProviderType, refreshAuth: () => Promise<void>) => AuthProviderType;
export declare const addRefreshAuthToDataProvider: <DataProviderType extends import("react-admin").DataProvider = import("react-admin").DataProvider>(provider: DataProviderType, refreshAuth: () => Promise<void>) => DataProviderType;
//# sourceMappingURL=index.d.ts.map