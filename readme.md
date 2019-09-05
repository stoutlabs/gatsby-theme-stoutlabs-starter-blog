# gatsby-theme-stoutlabs-starter-blog

I have converted my starter repo into a Gatsby theme, mostly for practice purposes. 

This isn't really meant for production — but I think it will be helpful to others for learning!

## Features:
* Customizable blog content location
* Customizable blog URL path (e.g. /blog, or /posts, or /whatever)
* Full MDX-powered blog with built-in:
  * post tags
  * pagination
  * PrismJS code markup
  * Markdown Remark images
  * post meta tags that auto-create pretty FB/Twitter link previews for you
* styled-components enabled, no need to install/configure them in Gatsby!
* Global style reset applied via styled-reset
* Node SASS compiling is configured/enabled, just put stylesheets into the `/src/styles/` folder of your site, and import them into pages/components where needed. (And/or set up a global stylesheet and import it via `gatsby-browser.js`)
* Advanced SEO component with full JSON site schema generators. Google will love you.
* Formik installed with Yup validation, should be ready to use. (I haven't tested this yet, but it _should_ work!)
* Automatic site manifest and favicon generation. Just put a 512x512 image into a folder in your site, and point to it in the config file. (See below)

## Instructions:

Installation is pretty easy! Just set up an initial/base Gatsby site from a starter (or on your own), and then:

### 1. Create the config/index.js file

Create a new file at `/src/config/index.js` and insert the following configuration object... adjusting values to match your site, of course:

```js
module.exports = {
  title: "Your Site",
  titleshort: "YourSite",
  company: "Your Company Name",
  description: `Opinionated barebones GatsbyJS starter theme with blog. Uses my preferred tools and setup. Minimal styling, almost zero layout - ready to edit!`,
  url: "https://yoursite.com", //live site url
  pathPrefix: "", // not really in use currently

  // Favicon/Manifest stuff
  iconImage: "src/images/gatsby-icon.png", // favicon file 
  // note: above must be 512x512 or larger 1:1 size, and location is relative to root

  // below are absolute URLs of 'site image' and 'logo', which are used as defaults when sharing links on FB/Twitter/etc. (see SEO component)
  // (In this theme, you can put these in /src/images and they'll magically work.)
  image: "https://www.yoursite.com/site-image.jpg",
  logo: "https://www.yoursite.com/android-chrome-512x512.jpg",

  // social media (for SEO & FB/Twitter sharing)
  twitter: "@yourTwitter",
  fbUrl: "https://www.facebook.com/your-url",
  fbAppID: "1234567890",

  // blog settings
  blogSuffix: " | My Blog", // attached to end of post title in <head>
  postsPerPage: 8,
  blogContentPath: "blog", // where the blog content lives
  blogContentBasePath: "/posts", // path on your site to display the blog

  // this is all needed for SEO schemas!
  address: {
    street: "1234 Test St",
    region: "TN",
    postalCode: "37663",
    city: "Your Town",
    geo: {
      latitude: 33.1,
      longitude: -81.1
    },
    telephone: "555-555-5555"
  },

  // site owner (author)
  author: {
    name: "Beau LaNoodles",
    minibio: `This is a custom author 'minibio'. You could use it for displaying an author's bio after a post, for example.`,
    something: `You can make whatever vars you want!`
  }
};
```

Note: Make sure you put the images used for `image` and `logo` into your site!


### 2. Edit gatsby-config.js

In `gatsby-config.js` for your site, you'll need a minimum of:

```js
const path = require("path");
const config = require("./src/config/index");

module.exports = {
  siteMetadata: {
    title: config.title,
    siteUrl: config.url,
    description: config.description,
    image: config.image,
    logo: config.logo,
    twitter: config.twitter,
    blogSuffix: config.blogSuffix,
    fbUrl: config.fbUrl,
    fbAppID: config.fbAppID,
    author: config.author,
    address: config.address,
    postsPerPage: config.postsPerPage,
    blogContentPath: config.blogContentPath,
    blogContentBasePath: config.blogContentBasePath
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/src/blog` // or whatever you set as blogContentPath
      }
    },
    {
      resolve: `gatsby-theme-stoutlabs-starter-blog`,
      // these are used in static queries in the theme, so we must pass them in here
      options: {
        title: config.title,
        company: config.company,
        postsPerPage: config.postsPerPage,
        contentPath: config.blogContentPath,
        basePath: config.blogContentBasePath,
        siteUrl: config.url,
        iconImage: config.iconImage
      }
    },
    {
      resolve: "gatsby-plugin-root-import",
      options: {
        src: path.join(__dirname, "src"),
        config: path.join(__dirname, "config")
      }
    }
  ]
};
```

## Customization

You can adjust the location of your blog post content (markdown/MDX files location) via `blogContentPath` in the config file.

You can adjust the URL of the blog posts via `blogContentBasePath` in the config file.

The appearance can be easily customized via component shadowing. Simply set up a directory in your site at `/src/gatsby-theme-stoutlabs-starter-blog` and copy any components from this repo into that directory, matching the same structure.

The areas you'll want to shadow are in `/src/components/Blog` and in `/src/styles`, so you could copy those over to your site at:
*  `/src/@stoutlabs/gatsby-theme-stoutlabs-starter-blog/components/Blog/`
*  `/src/@stoutlabs/gatsby-theme-stoutlabs-starter-blog/styles/`

Any files you place here will override any files that match the same location in the theme! 


## To Do:

Maybe refactor all those crazy siteMetadata calls into a custom static query hook... or a component with a static query in it.

A global state/context would be helpful for basePath, instead of all the prop drilling currently in place.

Other various refactoring... this thing is still pretty messy!

---

## Important:

This theme is NOT perfect! It is my very first attempt at one... 

I like jumping into the deep end first, so I didn't attempt to do something basic. I wanted my first Gatsby theme to have something with real-world features in it, and not just one or two basic things! So, here we are. 😎

Have fun, and happy experimenting/learning! 💜