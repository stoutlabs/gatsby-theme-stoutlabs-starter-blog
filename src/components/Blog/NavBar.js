import React from "react";
import { Link } from "gatsby";

import { StyledNav } from "../../styles/stoutlabs-blog-styles";

const CustomNavbar = ({ pageInfo, brand, basePath = "/blog" }) => {
  return (
    <StyledNav>
      <div className="container">
        <nav>
          <div className="brand">
            <Link to="/">{brand}</Link>
          </div>

          <ul>
            <li>
              <Link to={basePath}>Blog</Link>
            </li>
            <li>
              <Link to="/tags">Tags</Link>
            </li>
          </ul>
        </nav>
      </div>
    </StyledNav>
  );
};

export default CustomNavbar;
