//
import { Link } from 'components/Router';
import React from 'react';
import { useRouteData } from 'react-static';

export default function Blog() {
  const { posts } = useRouteData();
  return (
    <div>
      <h1>It&#39;s blog time.</h1>
      <div>
        <a href="#bottom" id="top">
          Scroll to bottom!
        </a>
      </div>
      <br />
      All Posts:
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/blog/post/${post.id}/`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      <a href="#top" id="bottom">
        Scroll to top!
      </a>
    </div>
  );
}
