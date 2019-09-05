import React from "react";
import { Link } from "gatsby";
import { TiArrowLeft, TiArrowRight } from "react-icons/ti/index.esm";

import { StyledPrevNext } from "../../styles/stoutlabs-blog-styles";

export const PrevNext = ({ prev, next, basePath }) => {
  return (
    <StyledPrevNext className="prevnext">
      <ul>
        {prev !== null ? (
          <li>
            <Link to={`${basePath}/` + prev.fields.slug} rel="prev">
              <TiArrowLeft /> Newer: {prev.frontmatter.title}
            </Link>
          </li>
        ) : (
          <li>&nbsp;</li>
        )}

        {next !== null ? (
          <li>
            <Link to={`${basePath}/` + next.fields.slug} rel="next" className="next">
              Older: {next.frontmatter.title}
              <TiArrowRight />
            </Link>
          </li>
        ) : (
          <li>&nbsp;</li>
        )}
      </ul>
    </StyledPrevNext>
  );
};

export default PrevNext;
