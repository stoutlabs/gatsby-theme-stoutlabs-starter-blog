const path = require("path");

module.exports = ({
  title = "App Title",
  company = "Your Company",
  postsPerPage = "5",
  contentPath = "blog",
  basePath = "/",
  siteUrl = "https://www.your-site.com",
  iconImage = "/src/images/favicon512x512.png"
}) => ({
  siteMetadata: {
    title,
    company
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-root-import`,
      options: {
        src: path.join(__dirname, "src")
      }
    },
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
      }
    },
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: path.join(__dirname, `src`, `pages`)
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `styles`,
        path: `${__dirname}/src/styles`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/${contentPath}`,
        name: `blog`
      }
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              linkImagesToOriginal: false,
              quality: 81,
              withWebp: {
                quality: 81
              }
            }
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: "›",
              aliases: {
                js: "javascript",
                sh: "bash"
              }
            }
          },
          {
            resolve: "gatsby-remark-copy-linked-files",
            options: {
              destinationDir: "images"
            }
          }
        ],
        plugins: [
          `gatsby-remark-images`,
          {
            resolve: `gatsby-plugin-root-import`,
            options: {
              src: path.join(__dirname, "src")
            }
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: title,
        short_name: `short-app`,
        start_url: `/`,
        background_color: `#555555`,
        theme_color: `#555555`,
        display: `minimal-ui`,
        icon: iconImage
      }
    }
  ]
});
