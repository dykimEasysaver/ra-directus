import { fetchUtils, DataProvider } from 'react-admin';
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
export declare const directusDataProvider: (apiBaseUrl: string, httpClient?: (url: any, options?: fetchUtils.Options) => Promise<{
    status: number;
    headers: Headers;
    body: string;
    json: any;
}>) => DataProvider;
//# sourceMappingURL=directusDataProvider.d.ts.map