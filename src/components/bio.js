/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import { rhythm } from "../utils/typography"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
            github
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata
  return (
    <div
      className="media"
    // style={{
    //   display: `flex`,
    //   marginBottom: rhythm(2.5),
    // }}
    >
      <div className="media-left">
        <p className="image is-64x64">
          <Image
            fixed={data.avatar.childImageSharp.fixed}
            alt={author.name}
            style={{
              marginRight: rhythm(1 / 2),
              marginBottom: 0,
              minWidth: 50,
              borderRadius: `100%`,
            }}
            imgStyle={{
              borderRadius: `50%`,
            }}
          />
        </p>
      </div>
      <div className="media-content">
        <div class="content">
          <p>
            <strong>{author.name}</strong>
            <br />{author.summary}
          </p>
        </div>
        <nav class="level is-mobile">
          <div class="level-left">
            <a class="level-item" href={`https://twitter.com/${social.twitter}`}>
              <span class="icon is-small"><i class="mdi mdi-24px mdi-twitter"></i></span>
            </a>
            <a class="level-item" href={`https://github.com/${social.github}`}>
              <span class="icon is-small"><i class="mdi mdi-24px mdi-github"></i></span>
            </a>
          </div>
        </nav>
      </div>

      {/* <p>
        <strong>{author.name}</strong> {author.summary}
        {` `}
        <a href={`https://twitter.com/${social.twitter}`}>Twitter</a>
      </p> */}
    </div>
  )
}

export default Bio
