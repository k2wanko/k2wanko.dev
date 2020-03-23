import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Profile from '../components/profile'
import { rhythm } from "../utils/typography"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle} style={{
    }}>
      <SEO title="Top" />
      <div className="columns"
        style={{ margin: '0 0' }}>
        <div
          className="section column is-one-quarter side-profile"
        >
          <Profile />
        </div>
        <div
          className="column"
          style={{
            background: '#fafbfc'
          }}>
          <div
            style={{
              marginLeft: `auto`,
              marginRight: `auto`,
              maxWidth: rhythm(32),
            }}>
            <h1
              className='title is-hidden-mobile'
              style={{
                fontFamily: `Montserrat, sans-serif`,
                marginTop: 20,
              }}
            >
              <Link
                style={{
                  boxShadow: `none`,
                  textDecoration: `none`,
                  color: `inherit`,
                }}
                to={`/`}
              >
                {siteTitle}
              </Link>
            </h1>
            <h4 className="subtitle is-5" style={{ marginTop: '40px' }}>Blog
            <span style={{textAlign: 'right'}}><a target="_blank" rel="noopener" href="/rss.xml"><i className="mdi mdi-24px mdi-rss mdi-dark rss-icon"></i></a></span></h4>
            <div className="tile is-ancestor columns is-multiline">
              {posts.map(({ node }) => {
                const title = node.frontmatter.title || node.fields.slug
                return (
                  <div key={node.fields.slug} className="tile is-parent is-6">
                    <article className="tile is-child box">
                      <p className="title is-5">
                        <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                          {title}
                        </Link>
                      </p>
                      <small>{node.frontmatter.date}</small>
                      <p
                        className="subtitle"
                        dangerouslySetInnerHTML={{
                          __html: node.frontmatter.description || node.excerpt,
                        }}></p>
                      {/* <p className="content"></p> */}
                    </article>
                  </div>
                )
              })}</div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
