import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";

import { 
  generateSchemaBase, 
  generateHomepageSchemaAdditions,
  generateBreadcrumbSchema,
  generatePostSchema,
  // generateProjectSchema
} from "../../helpers/seoHelpers";


const getSchemaOrgJSONLD = ({
  isProjectPage,
  isBlogPage,
  url,
  theTitle,
  image,
  theDescription,
  datePublished,
  siteMetadata
}) => {
  const schemaOrgJSONLD = generateSchemaBase(theTitle, theDescription, url, siteMetadata);

  if (url === siteMetadata.siteUrl) {
    return [
      ...schemaOrgJSONLD,
      generateHomepageSchemaAdditions(siteMetadata),
    ];
  }

  if (isBlogPage) {
    return [
      ...schemaOrgJSONLD,
      generateBreadcrumbSchema(url, theTitle, image),
      generatePostSchema(url, theTitle, image, theDescription, datePublished, siteMetadata),
    ];
  }

  return schemaOrgJSONLD;
};

const SEO = ({ 
  postData, 
  postImage, 
  isProjectPage, 
  isBlogPage,
  siteMetadata
}) => {
  const postMeta = postData.frontmatter || {};

  const theTitle = isBlogPage
    ? postMeta.title + siteMetadata.blogSuffix
    : postMeta.title
    ? postMeta.title
    : siteMetadata.title;

  const theDescription = postMeta.description || postData.excerpt || siteMetadata.description;

  const image = postImage ? `${siteMetadata.siteUrl}${postImage}` : siteMetadata.image;

  const url = isBlogPage
    ? `${siteMetadata.siteUrl}${siteMetadata.blogContentBasePath}${postData.fields.slug}`
    : siteMetadata.siteUrl;

  const datePublished = isBlogPage ? postMeta.date : false;

  const schemaOrgJSONLD = getSchemaOrgJSONLD({
    isBlogPage,
    isProjectPage,
    url,
    theTitle,
    image,
    theDescription,
    datePublished,
    siteMetadata
  });

  return (
    <Helmet title={theTitle}>
      {/* General tags */}
      <html lang="en" />
      <meta name="description" content={theDescription} />
      <meta name="image" content={image} />
      <meta name="google-site-verification" content="your_value_here" />

      {/* Schema.org tags */}
      <script type="application/ld+json">{JSON.stringify(schemaOrgJSONLD)}</script>

      {/* OpenGraph tags */}
      <meta property="og:url" content={url} />
      {isProjectPage || isBlogPage ? (
        <meta property="og:type" content="article" />
      ) : (
        <meta property="og:type" content="website" />
      )}
      <meta property="og:title" content={theTitle} />
      <meta property="og:description" content={theDescription} />
      <meta property="og:image" content={image} />
      <meta property="fb:app_id" content={siteMetadata.fbAppID} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={siteMetadata.twitter} />
      <meta name="twitter:title" content={theTitle} />
      <meta name="twitter:description" content={theDescription} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

SEO.propTypes = {
  isBlogPost: PropTypes.bool,
  postData: PropTypes.shape({
    frontmatter: PropTypes.any,
    excerpt: PropTypes.any,
  }).isRequired,
  postImage: PropTypes.string,
};

SEO.defaultProps = {
  isProjectPage: false,
  isBlogPage: false,
  postImage: null,
  postData: {}
};

export default SEO;
