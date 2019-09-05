import React from "react";
import Img from "gatsby-image";
import { Link } from "gatsby";
import { TiArrowBack } from "react-icons/ti";

import BlogShareButtons from "./BlogShareButtons";
import Content from "./Content";
import PrevNext from "./PrevNext";

import {
  StyledFeatured,
  StyledPostContainer,
  BackToList
} from "../../styles/stoutlabs-blog-styles";

const Post = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  date,
  helmet,
  prev,
  next,
  featureimg,
  timetoread,
  slug,
  allNode,
  shareImg,
  basePath = "/blog",
  siteUrl
}) => {
  const PostContent = contentComponent || Content;

  return (
    <article>
      <StyledPostContainer>
        <h1>{title}</h1>
        <p className="post-date">
          {date} |{" "}
          <span className="readtime">
            time to read: {timetoread} min
            {timetoread > 1 ? "s" : ""}
          </span>
        </p>

        {featureimg && (
          <StyledFeatured>
            <Img fluid={featureimg.childImageSharp.fluid} />
          </StyledFeatured>
        )}

        <PostContent content={content} className="post-content" />

        <BlogShareButtons
          postPath={slug}
          postNode={allNode}
          mobile={false}
          shareImg={shareImg}
          basePath={basePath}
          siteUrl={siteUrl}
        />
      </StyledPostContainer>

      <div className="container">
        <PrevNext prev={prev} next={next} basePath={basePath} />

        <BackToList>
          <TiArrowBack /> <Link to={basePath}>Back to list</Link>
        </BackToList>
      </div>
    </article>
  );
};

export default Post;
