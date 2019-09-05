import React from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  FacebookShareCount,
  TwitterIcon,
  TwitterShareButton,
  EmailIcon,
  EmailShareButton
} from "react-share";
import urljoin from "url-join";

import { StyledShareButtons } from "../../styles/stoutlabs-blog-styles";

const BlogShareButtons = props => {
  const { postNode, postPath, mobile } = props;
  const post = postNode.frontmatter;
  const url = urljoin(props.siteUrl, props.basePath, postPath);
  const iconSize = mobile ? 36 : 48;
  const filter = count => (count > 0 ? count : "");
  const renderShareCount = count => <div className="share-count">{filter(count)}</div>;

  return (
    <StyledShareButtons>
      <h4>Share This Post:</h4>

      <div className="social-links">
        <TwitterShareButton url={url} title={post.title}>
          <TwitterIcon round size={iconSize} />
        </TwitterShareButton>

        <FacebookShareButton url={url} quote={postNode.excerpt}>
          <FacebookIcon round size={iconSize} />
          <FacebookShareCount url={url}>
            {shareCount => renderShareCount(shareCount)}
          </FacebookShareCount>
        </FacebookShareButton>

        <EmailShareButton subject="Check Out This Link From StoutLabs.com" url={url}>
          <EmailIcon round size={iconSize} />
        </EmailShareButton>
      </div>
    </StyledShareButtons>
  );
};

export default BlogShareButtons;
