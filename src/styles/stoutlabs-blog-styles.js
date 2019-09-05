import styled from "styled-components";

/**
 *  BlogShareButtons.js styles
 */
export const StyledShareButtons = styled.div`
  margin: 0 auto;
  padding: 1rem;

  h4 {
    font-size: 1.2rem !important;
    text-align: center;
  }

  div.social-links {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    align-items: flex-start;
    margin: 15px 0;

    > div {
      margin: 5px 15px;
      &:hover {
        cursor: pointer;
        opacity: 0.9;
      }
    }

    .share-count {
      text-align: center;
      color: #99d7e1;
      opacity: 0.95;
      font-size: 0.95rem;
      padding: 0.33rem 0 0;
    }
  }
`;

/**
 *  Footer.js styles
 */
export const StyledFooter = styled.footer`
  background: rgb(30, 30, 30);
  padding: 10px;
  color: rgb(220, 220, 220);
  text-align: center;
`;

/**
 *  Layout.js styles
 */
// note: this makes an easy sticky footer
export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  main.main-content {
    flex: 1;
    padding: 0;
  }
`;

/**
 *  NavBar.js styles
 */

export const StyledNav = styled.div`
  background: rgb(100, 100, 100);
  padding: 0 1rem;

  div.brand {
    a {
      color: rgb(250, 250, 250);
      text-decoration: none;
      font-size: 2rem;
      font-weight: bold;
    }
  }

  nav {
    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and (min-width: 768px) {
      flex-direction: row;
      justify-content: flex-start;
    }

    ul {
      display: flex;
      flex-direction: column;
      list-style: none;

      @media screen and (min-width: 768px) {
        flex-direction: row;
      }

      li {
        margin: 0 15px 0 0;
        padding: 0;

        a {
          color: white;
          text-decoration: none;
          display: block;
          padding: 10px;
          text-align: center;

          &:hover {
            background: rgba(250, 250, 250, 0.2);
          }
        }
      }
    }
  }
`;

/**
 *  PaginatorLinks.js styles
 */

export const StyledPaginatorLinks = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 1rem;

  ul.pagination {
    display: flex;
    flex-direction: row;

    li {
      display: inline-block;
      padding: 0.5rem;
      margin: 0 0.33rem;
      border: 1px solid rgba(120, 120, 120, 0.3);
    }
  }
`;

/**
 *  Post.js styles
 */

export const StyledFeatured = styled.div`
  max-width: 100%;
  margin: 2rem auto;
`;

export const StyledPostContainer = styled.div`
  max-width: 900px;
  margin: 2rem auto;

  h1 {
    font-size: 2.4rem;
    line-height: 1.33;
    margin: 0 0 1rem;
    padding: 0;
  }

  p.post-date {
    border-radius: 10px;
    margin: 0;
    padding: 1rem;
    font-size: 0.9rem;
    background: rgba(100,100,100,0.1);
  }

  div.post-content {
    margin: 2rem 0 0;
  }
`;

export const BackToList = styled.div`
  margin: 0 0 2rem;
  text-align: center;
`;

/**
 *  PostList.js styles
 */

export const PostsList = styled.div`
  padding: 1rem;

`;

/**
 *  PrevNext.js styles
 */

export const StyledPrevNext = styled.div`
  margin: 2.5rem 0;
  padding: 1.5rem;
  border: 1px solid rgba(55, 55, 55, 0.1);
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
  }
  li {
    margin: 0;
    width: 50%;
    a {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      padding: 0.3rem;
      color: #777;
      text-align: left;
      font-size: 0.95rem;
      text-decoration: none;

      &:visited {
        color: #777;
      }
      &:hover {
        color: #999;
        text-decoration: none;
      }
      span {
        padding: 0 1rem 0 0;
      }
    }
    a.next {
      justify-content: flex-end;
      span {
        padding: 0 0 0 1rem;
      }
    }
  }
`;

/**
 *  Summary.js Styles
 */

export const StyledSummary = styled.article`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 0 0 1rem;
  padding: 0 0 1rem;
  width: 100%;

  @media screen and (min-width: 768px) {
    align-items: flex-start;
    width: calc(50% - 1rem);
  }

  div.thumbnail {
    width: 100%;
    margin: 0;
    padding: 0 0 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;

    img {
      max-width: 100%;
    }
  }

  div.summary-content {
    flex: 1;

    h3 {
      font-size: 1.25rem;
      line-height: 1.25;
      margin: 0.3rem 0 0.25rem;
      padding: 0 0 0.25rem;
      letter-spacing: unset;
      /* font-family: 'Merriweather', serif; */
      font-family: Arial, Helvetica, sans-serif;
      text-align: left;
    }

    div.post-meta {
      color: #888;
      margin: 0 0 1rem;

      span.date {
        color: #444;

        font-size: 0.9rem;
        padding-right: 0.5rem;
        margin: 0 0.5rem 0.75rem 0;

        border-right: 1px solid rgba(150, 150, 150, 0.3);
      }

      span.readtime {
        display: inline-block;
        font-size: 0.9rem;
        font-style: italic;
        line-height: 1;
      }

      span.tags {
        display: block;
        font-size: 0.9rem;
        margin: 0.66rem 0;

        a {
          background-color: rgba(150, 150, 150, 0.07);
          border-radius: 6px;
          display: inline-block;
          font-size: 0.9rem;
          font-style: italic;
          line-height: 1;
          padding: 0.25rem;
          margin-right: 0.3rem;
          margin-bottom: 0.4rem;
        }
      }
    }

    p.desc {
      margin: 0 0 1rem;
      font-size: 0.975rem;
    }
  }
`;
