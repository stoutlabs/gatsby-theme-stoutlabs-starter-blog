import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Layout from "../components/Blog/Layout";
import Post from "../components/Blog/Post";
import { MdxContent } from "../components/Blog/Content";
import Seo from "../components/Blog/SEO";

// This is basically a data fetch component...
// We push the fetched data to the needed component(s) from here.
const PostTemplate = ({ data, pageContext }) => {
  const { mdx: post } = data;

  return (
    <Layout>
      <Seo
        postData={post}
        isBlogPage={true}
        postImage={post.frontmatter.featureimg.childImageSharp.fluid.src}
        siteMetadata={data.site.siteMetadata}
      />
      <Post
        content={post.body}
        contentComponent={MdxContent}
        description={post.frontmatter.description}
        tags={post.frontmatter.tags}
        date={post.frontmatter.date}
        title={post.frontmatter.title}
        prev={pageContext.previous}
        next={pageContext.next}
        featureimg={post.frontmatter.featureimg}
        timetoread={post.timeToRead}
        slug={post.fields.slug}
        allNode={post}
        shareImg={post.frontmatter.featureimg.childImageSharp.fluid.src}
        basePath={pageContext.basePath}
        siteUrl={data.site.siteMetadata.siteUrl}
      />
    </Layout>
  );
};

Post.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.object
  })
};

export default PostTemplate;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    mdx(id: { eq: $id }) {
      id
      body
      fields {
        slug
      }
      timeToRead
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        featureimg {
          childImageSharp {
            fluid(maxWidth: 750, quality: 80) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }

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
  }
`;
