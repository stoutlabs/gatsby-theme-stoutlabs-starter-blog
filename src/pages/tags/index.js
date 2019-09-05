import React from "react";
import slugify from "slugify";
import { Link, useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";

import BlogLayout from "../../components/Blog/Layout";
import Seo from "../../components/Blog/SEO";

const TagIndexSection = styled.section`
  padding: 1rem;

  h2 {
    font-size: 2rem;
    margin: 0 0 2rem;
  }

  ul.taglist {
    li {
      border: 1px solid rgba(50, 50, 50, 0.4);
      margin: 0.5rem 0.33rem;
      display: inline-flex;
      flex-direction: row;

      a {
        color: #333;
        display: block;
        padding: 0.75rem 1rem;
        text-decoration: none;
      }
    }
  }
`;



const TagsPage = () => {
  const data = useStaticQuery(graphql`
    query TagsQuery {
      site {
        siteMetadata {
          blogSuffix
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
        filter: { frontmatter: { templateKey: { eq: "post" }, draft: { ne: true } } }
      ) {
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
      }
    }
  `);

  const seoData = {
    frontmatter: {
      title: `All Tags | ${data.site.siteMetadata.title}`,
      description: "List of all tags used in this blog."
    }
  };

  // destructure and sort tags by count
  const sortedTags = data.allMdx.group.sort((a, b) => b.totalCount - a.totalCount);

  return (
    <BlogLayout>
      <TagIndexSection>
        <Seo postData={seoData} siteMetadata={data.site.siteMetadata} />
        <div className="content">
          <div>
            <h2 className="title is-size-2 is-bold-light">All Tags:</h2>

            <ul className="taglist">
              {sortedTags.map(tag => (
                <li key={tag.fieldValue}>
                  <Link to={`/tags/${slugify(tag.fieldValue)}/`}>
                    {tag.fieldValue} ({tag.totalCount})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </TagIndexSection>
    </BlogLayout>
  );
};

export default TagsPage;
