import React from "react";
import { graphql } from "gatsby";

import BlogLayout from "../components/Blog/Layout";
import PostList from "../components/Blog/PostList";
import PaginatorLinks from "../components/Blog/PaginatorLinks";
import Seo from "../components/Blog/SEO";

const PostsTemplate = ({ pageContext, data, location }) => {
  const seoData = {
    frontmatter: {
      title: `${data.site.siteMetadata.title} | Blog`
    }
  };

  const posts = data.allMdx.edges;

  return (
    <BlogLayout location={location}>
      <Seo postData={seoData} siteMetadata={data.site.siteMetadata} />
      <PostList
        posts={posts}
        currentPage={pageContext.currentPage}
        basePath={pageContext.basePath}
      />
      {pageContext.numPages > 1 && (
        <PaginatorLinks
          currentPage={pageContext.currentPage}
          totalPages={pageContext.numPages}
          basePath={pageContext.basePath}
        />
      )}
    </BlogLayout>
  );
};

export default PostsTemplate;

export const blogListQuery = graphql`
  query blogIndexQuery($skip: Int!, $limit: Int!) {
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
      filter: { frontmatter: { templateKey: { eq: "post" }, draft: { ne: true } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          excerpt
          fields {
            slug
          }
          timeToRead
          frontmatter {
            tags
            date(formatString: "DD MMMM, YYYY")
            rawdate: date(formatString: "YYYY-MMM-DD")
            title
            description
            featureimg {
              childImageSharp {
                fluid(maxWidth: 800, quality: 81) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`;
