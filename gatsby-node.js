const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const { createFilePath } = require("gatsby-source-filesystem");
const slugify = require("slugify");

// creates the directories needed in this theme, if not there
exports.onPreBootstrap = ({ store, reporter }, options) => {
  const { program } = store.getState();
  const contentPath = options.contentPath || "blog"
  const dirs = [
    path.join(program.directory, `src/${contentPath}`),
    path.join(program.directory, "src/images"),
    path.join(program.directory, "src/pages")
  ];
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      reporter.log(`creating the ${dir} directory`);
      mkdirp.sync(dir);
    }
  });
};


// add custom slug field to our MDX pages
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  // console.log("node.internal.type: ", node.internal.type);
  if (node.internal.type === "Mdx") {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value
    });
  }
};

// create pages from all MDX with template tag of 'post'
exports.createPages = async ({ actions, graphql }, options) => {
  const { createPage } = actions;

  const allBlogPosts = await graphql(`
    {
      allMdx(
        filter: { frontmatter: { templateKey: { eq: "post" }, draft: { ne: true } } }
        sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
        limit: 1000
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
              tags
              title
            }
          }
        }
      }

      
    }
  `);

  //create blog pages, tag pages
  const posts = allBlogPosts.data.allMdx.edges;

  try {
    posts.forEach((post, index) => {
      // set up prev/next links for each article
      const next = index === posts.length - 1 ? null : posts[index + 1].node;
      const previous = index === 0 ? null : posts[index - 1].node;

      createPage({
        path: `${options.basePath}${post.node.fields.slug}`,
        tags: post.node.frontmatter.tags,
        component: require.resolve(
          `./src/templates/${String(post.node.frontmatter.templateKey)}-template.js`
        ),
        context: {
          id: post.node.id,
          slug: post.node.fields.slug,
          previous,
          next,
          basePath: options.basePath
        }
      });
    });
  } catch (e) {
    console.log("Error creating blog posts: ", e);
  }

  try {
    let tags = [];

    posts.forEach(({ node }) => {
      if (node.frontmatter.tags !== undefined) {
        tags = tags.concat(node.frontmatter.tags);
      }
    });

    const uniqueTags = [...new Set(tags)];

    uniqueTags.forEach(tag => {
      // console.log("tag: ", tag);
      const tagPath = `/tags/${slugify(tag)}/`;

      createPage({
        path: tagPath,
        component: require.resolve(`./src/templates/tags-template.js`),
        context: {
          tag,
          basePath: options.basePath
        }
      });
    });
  } catch (e) {
    console.log("Error creating tags: ", e);
  }

  try {
    // Create blog-list pages
    const postsPerPage = options.postsPerPage;
    const numPages = Math.ceil(posts.length / postsPerPage);
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `${options.basePath}` : `${options.basePath}/${i + 1}`,
        component: require.resolve("./src/templates/posts-template.js"),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
          basePath: options.basePath
        }
      });
    });
  } catch (e) {
    console.log("Error creating blog index pages: ", e);
  }
};