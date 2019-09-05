export const generateSchemaBase = (title, description, url, siteMetadata) => {
  return [
    {
      "@context": "http://schema.org",
      "@type": "WebSite",
      url: url,
      name: title,
      alternateName: siteMetadata.title,
      author: {
        "@type": "Person",
        name: siteMetadata.author.name
      },
      description: description,
      publisher: siteMetadata.company
    }
  ];
};

export const generateHomepageSchemaAdditions = (siteMetadata) => {
  const socials = (siteMetadata) => {
    let arr = [];
    if(siteMetadata.fbURL) arr.push(siteMetadata.fbURL);
    if(siteMetadata.twitter) arr.push(`https://www.twitter.com/${siteMetadata.twitter}`);

    return arr;
  }

  return {
    "@context": "http://schema.org",
    "@type": "LocalBusiness",
    address: {
      "@type": "PostalAddress",
      addressLocality: siteMetadata.address.city,
      addressRegion: siteMetadata.address.region,
      postalCode: siteMetadata.address.postalCode,
      streetAddress: siteMetadata.address.street
    },
    description: siteMetadata.description,
    name: siteMetadata.company,
    telephone: siteMetadata.address.phone,
    openingHours: "Mo,Tu,We,Th,Fr 8:00-17:00",
    image: siteMetadata.image,
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteMetadata.address.geo.latitude,
      longitude: siteMetadata.address.geo.longitude
    },
    sameAs: socials(siteMetadata)
  };
};

export const generateBreadcrumbSchema = (url, title, image) => {
  return {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@id": url,
          name: title,
          image
        }
      }
    ]
  };
};

export const generatePostSchema = (url, title, image, description, datePublished, siteMetadata) => {
  return {
    "@context": "http://schema.org",
    "@type": "Article",
    url,
    name: title,
    alternateName: siteMetadata.title,
    headline: title,
    image: {
      "@type": "ImageObject",
      url: image
    },
    description,
    author: {
      "@type": "Person",
      name: siteMetadata.author.name
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url
    },
    datePublished: datePublished,
    publisher: {
      "@type": "Organization",
      name: siteMetadata.company,
      logo: {
        "@type": "ImageObject",
        width: 226,
        height: 60,
        url: siteMetadata.logo
      }
    }
  };
};

export const generateProjectSchema = (url, title, image, description, datePublished, siteMetadata) => {
  return {
    "@context": "http://schema.org",
    "@type": "WebPage",
    url,
    name: title,
    alternateName: siteMetadata.title,
    headline: title,
    image: {
      "@type": "ImageObject",
      url: image
    },
    description,
    author: {
      "@type": "Person",
      name: "Daniel Stout"
    },
    mainEntityOfPage: {
      "@type": "WebSite",
      "@id": siteMetadata.url
    },
    datePublished: datePublished
  };
};
