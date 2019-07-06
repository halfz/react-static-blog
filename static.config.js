/* eslint-disable react/prop-types */
import _ from 'lodash';
import React from 'react';

import { makePageRoutes } from 'react-static/node';
import loadData from './internal/data';

export default {

  siteRoot: 'https://halfz.github.io',
  getRoutes: async () => {
    const Data = await loadData();
    const pageRoutersWithPosts = (posts, basePath = '/', additionalData = {}, size = 5) => makePageRoutes({
      items: posts,
      pageSize: size,
      pageToken: 'page',
      route: {
        path: basePath,
        template: 'src/pages/',
      },
      decorate: (items, i, totalPages) => ({
        // For each page, supply the posts, page and totalPages
        getData: () => ({
          basePath,
          posts: items,
          currentPage: i,
          totalPages,
          tags: Data.tags,
          categories: Data.categories,
          ...(additionalData),
        }),
      }),
    });

    let categoryRouters = [];
    _.forEach(Data.categories, (data, key) => {
      categoryRouters = _.concat(categoryRouters, pageRoutersWithPosts(data, `category/${key}/`, {
        category: key,
      }));
    });


    let tagRouters = [];
    _.forEach(Data.tags, (data, key) => {
      tagRouters = _.concat(tagRouters, pageRoutersWithPosts(data, `tag/${key}/`, {
        tag: key,
      }));
    });
    let authorRouters = [];
    _.forEach(Data.authorPosts, (data, key) => {
      authorRouters = _.concat(authorRouters, pageRoutersWithPosts(data, `author/${key}/`, {
        author: key,
      }));
    });

    return [
      ...pageRoutersWithPosts(Data.posts),

      ...(Data.posts.map((post) => ({
        path: `/post/${post.id}`,
        template: 'src/pages/post',
        getData: () => ({
          post,
        }),
      }))),
      ...(tagRouters),
      ...(categoryRouters),
      ...(authorRouters),
      // A 404 component
      {
        path: '404',
        template: 'src/pages/404',
      },
    ];
  },
  Document: (
    {
      Html,
      Head,
      Body,
      children,
    },
  ) => (
    <Html lang="ko-KR">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </Head>
      <Body>
        <div id="fb-root"></div>
        {children}
      </Body>
      <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v3.3&appId=188958451549867&autoLogAppEvents=1" />
    </Html>
  ),
  plugins: [
    require.resolve('react-static-plugin-reach-router'),
    require.resolve('react-static-plugin-sitemap'),
    require.resolve('react-static-plugin-styled-components'),
    require.resolve('./internal/webpack'),
  ],
  paths: {
    dist: 'dist',
  },
  devServer: {
    port: 3000,
    host: '127.0.0.1',
  },
};
