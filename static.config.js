import axios from 'axios';
import path from 'path';

export default {
  getRoutes: async () => {
    const { data: posts } = await axios.get(
      'https://jsonplaceholder.typicode.com/posts',
    );

    return [
      {
        path: '/blog',
        getData: () => ({
          posts,
        }),
        children: posts.map((post) => ({
          path: `/post/${post.id}`,
          template: 'src/containers/Post',
          getData: () => ({
            post,
          }),
        })),
      },
      // A 404 component
      {
        path: '404',
        template: 'src/pages/404',
      },
      {
        path: '/',
        template: 'src/pages/',
      },
      {
        path: '/blog',
        template: 'src/pages/blog',
      },
      {
        path: '/about',
        template: 'src/pages/about',
      },
    ];
  },
  plugins: [
    [
      require.resolve('react-static-plugin-source-filesystem'),
      {
        location: path.resolve('./src/pages'),
      },
    ],
    require.resolve('react-static-plugin-reach-router'),
    require.resolve('react-static-plugin-sitemap'),
  ],
  paths: {
    dist: 'halfz.github.io',
  },
  devServer: {
    port: 3000,
    host: '127.0.0.1',
  },
};
