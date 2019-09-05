import React from 'react';
import Img from 'gatsby-image';
import { Link } from 'gatsby';

import { StyledSummary } from "../../styles/stoutlabs-blog-styles";

export const Summary = ({ node, title, basePath }) => {

  return (
    <StyledSummary className="post-summary">
      <div className="thumbnail">
        <Link to={`${basePath}${node.fields.slug}`}>
          <Img fluid={node.frontmatter.featureimg.childImageSharp.fluid} />
        </Link>
      </div>

      <div className="summary-content">
        <h3>
          <Link to={`${basePath}${node.fields.slug}`}>{title}</Link>
        </h3>
        <div className="post-meta">
          <span className="date">{node.frontmatter.date}</span>
          <span className="readtime">
            time to read: {node.timeToRead} min
            {node.timeToRead > 1 ? "s" : ""}
          </span>
        </div>
        <p className="desc">{node.frontmatter.description} </p>
      </div>
    </StyledSummary>
  );
};

export default Summary;
