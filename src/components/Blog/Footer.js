import React from "react";
import { StaticQuery, graphql } from "gatsby";

import { StyledFooter } from "../../styles/stoutlabs-blog-styles";

const Footer = () => {
  return (
    <StaticQuery
      query={graphql`
        query FooterQuery {
          site {
            siteMetadata {
              company
            }
          }
        }
      `}
      render={data => (
        <StyledFooter>
          <div>
            <p>
              &copy;{" "}
              {new Date().getFullYear() + " " + data.site.siteMetadata.company}
            </p>
          </div>
        </StyledFooter>
      )}
    />
  );
};

export default Footer;
