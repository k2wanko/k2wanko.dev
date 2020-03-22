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
            <h3
              className='title'
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
            </h3>
            <div>
              {posts.map(({ node }) => {
                const title = node.frontmatter.title || node.fields.slug
                return (
                  <article key={node.fields.slug}>
                    <header>
                      <h3
                        style={{
                          marginBottom: rhythm(1 / 4),
                        }}
                      >
                        <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                          {title}
                        </Link>
                      </h3>
                      <small>{node.frontmatter.date}</small>
                    </header>
                    <section>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: node.frontmatter.description || node.excerpt,
                        }}
                      />
                    </section>
                  </article>
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
