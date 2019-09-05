import React from "react";
import { Link } from "gatsby";

import { StyledPaginatorLinks } from "../../styles/stoutlabs-blog-styles";

const PaginatorLinks = ({ totalPages, currentPage, basePath = "/blog" }) => {
  // determine the current page 'block' (a.k.a. page number groupings)
  const pageBlockSize = 6;
  const totalBlocks = Math.ceil(totalPages / pageBlockSize);
  const currentPageBlock = Math.ceil(currentPage / pageBlockSize);

  const renderPageNumbersInBlock = () => {
    let linksArr = [];
    for (let x = 1; x <= pageBlockSize; x++) {
      let theNumLink;
      const theNum = x + pageBlockSize * (currentPageBlock - 1);

      // edge case: first item in the first block has a different link ('/blog' instead of '/blog/1')
      if (theNum === 1) {
        theNumLink = (
          <li className={`page-item ${currentPage === 1 && "active"}`} key={theNum}>
            <Link to={`${basePath}/`} className={`page-link`}>
              1
            </Link>
          </li>
        );

        linksArr.push(theNumLink);
      }
      // remaining items
      else if (theNum <= totalPages) {
        theNumLink = (
          <li className={`page-item ${theNum === currentPage && "active"}`} key={theNum}>
            <Link to={`${basePath}/${theNum}`} className="page-link">
              {theNum}
            </Link>
          </li>
        );

        linksArr.push(theNumLink);
      }
    }
    return linksArr;
  };

  return (
    <StyledPaginatorLinks>
      <ul className="pagination">
        <li className={`page-item`}>
          <Link to={`${basePath}/`} className="page-link">
            First
          </Link>
        </li>

        {currentPageBlock > 1 && (
          <li className="page-item">
            <Link
              to={`${basePath}/${(currentPageBlock - 1) * pageBlockSize}`}
              className="page-link"
            >
              ...
            </Link>
          </li>
        )}

        {/* {pageNumbers} */}
        {renderPageNumbersInBlock()}

        {totalPages > pageBlockSize && currentPageBlock < totalBlocks && (
          <li className="page-item">
            <Link to={`${basePath}/${currentPageBlock * pageBlockSize + 1}`} className="page-link">
              ...
            </Link>
          </li>
        )}

        <li className={`page-item`}>
          <Link to={`${basePath}/${totalPages}`} className="page-link">
            Last
          </Link>
        </li>
      </ul>
      {/* <Link to={`/blog/${i}`} key={`pagelink_${i}`}>{i}</Link> */}
    </StyledPaginatorLinks>
  );
};

export default PaginatorLinks;
