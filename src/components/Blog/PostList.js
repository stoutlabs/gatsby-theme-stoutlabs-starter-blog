import React from "react";

import Summary from "./Summary";
import { PostsList } from "../../styles/stoutlabs-blog-styles";

export default ({ posts, basePath = "/blog" }) => {
  return (
    <PostsList>
      <h1>Blog Posts: </h1>
      {posts.length > 0 && (
        <div className="posts-list-items">
          {posts.map(({ node }) => {
            const title = node.frontmatter.title
              ? node.frontmatter.title
              : node.fields.slug;

            return <Summary node={node} title={title} key={node.fields.slug} basePath={basePath} />;
          })}
        </div>
      )}

      {posts.length <= 0 && (
        <p>Hey there! It looks like you need to add some blog posts to: <code>/src/blog</code>.</p>
      )}
    </PostsList>
  );
};
