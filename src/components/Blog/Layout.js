import React from "react";
import { StaticQuery, graphql } from "gatsby";

import Navbar from "./NavBar";
import Footer from "./Footer";
import { GlobalStyle } from "../../styles/globalStyles";
import { StyledWrapper } from "../../styles/stoutlabs-blog-styles";

const Layout = ({ children, pageInfo }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            company
            blogContentBasePath
          }
        }
      }
    `}
    render={data => (
      <>
        <GlobalStyle />
        <StyledWrapper>
          <Navbar
            pageInfo={pageInfo}
            brand={data.site.siteMetadata.title}
            basePath={data.site.siteMetadata.blogContentBasePath}
          />
          <main className="main-content">{children}</main>
          <Footer />
        </StyledWrapper>
      </>
    )}
  />
);

export default Layout;
