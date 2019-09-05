import React from "react";
import { Link, graphql } from "gatsby";
import styled from "styled-components";

import Layout from "../components/Blog/Layout";
import Seo from "../components/Blog/SEO";

const StyledTagsSection = styled.section`
  padding: 1rem;

  ul.taglist {
    margin: 2rem 0;
    li {
      margin: 0 0 0.75rem;
      padding: 0 0 0.75rem;
      border-bottom: 1px solid rgba(250, 250, 250, 0.1);
      &:last-child {
        border-bottom: 0;
      }
    }
  }
`;

const TagPageTemplate = props => {
  const posts = props.data.allMdx.edges;
  const postLinks = posts.map(post => (
    <li key={post.node.fields.slug}>
      <Link to={props.pageContext.basePath + post.node.fields.slug}>
        <h3>{post.node.frontmatter.title}</h3>
      </Link>
    </li>
  ));
  const tag = props.pageContext.tag;
  const title = `Posts Tagged: ${tag}`;
  const totalCount = props.data.allMdx.totalCount;
  const tagHeader = `${totalCount} post${totalCount === 1 ? "" : "s"} tagged with “${tag}”:`;

  const seoData = {
    frontmatter: {
      title: title,
      description: `List of all posts tagged with: ${tag}`
    }
  };

  return (
    <Layout>
      <StyledTagsSection>
        <Seo postData={seoData} siteMetadata={props.data.site.siteMetadata} />

        <div className="content">
          <h2>{tagHeader}</h2>
          <ul className="taglist">{postLinks}</ul>
          <p>
            <Link to="/tags">Browse All Tags</Link> |{" "}
            <Link to={props.pageContext.basePath}>Back to Blog Home</Link>
          </p>
        </div>
      </StyledTagsSection>
    </Layout>
  );
};

export default TagPageTemplate;

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        blogSuffix
        blogContentPath
        blogContentBasePath
        siteUrl
        description
        logo
        image
        title
        company
        fbUrl
        fbAppID
        twitter
        author {
          name
        }
        address {
          street
          region
          postalCode
          city
          geo {
            latitude
            longitude
          }
          telephone
        }
      }
    }
    allMdx(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] }, draft: { ne: true } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
