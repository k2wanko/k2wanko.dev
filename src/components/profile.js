import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

const Profile = () => {
    const data = useStaticQuery(graphql`
    query ProfileQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
        childImageSharp {
          fixed(width: 150, height: 150) {
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
            linkedin
          }
        }
      }
    }
  `)

    const { author, social } = data.site.siteMetadata
    return (
        <div>
            <Image
                fixed={data.avatar.childImageSharp.fixed}
                alt={author.name}
            // style={{
            //   marginRight: rhythm(1 / 2),
            //   marginBottom: 0,
            //   minWidth: 50,
            // }}
            />
            <h2 className="title">{author.name}</h2>
            <p className="subtitle">{author.summary}</p>
            <div>
                <ul>
                    <li>
                        <span>
                            <i className="mdi mdi-24px mdi-twitter mdi-dark"></i>
                            {` `}
                            <a href={`https://twitter.com/${social.twitter}`}>@{social.twitter}</a>
                        </span>
                    </li>
                    <li>
                        <span>
                            <i className="mdi mdi-24px mdi-github mdi-dark"></i>
                            {` `}
                            <a href={`https://github.com/${social.github}`}>@{social.github}</a>
                        </span>
                    </li>
                    <li>
                        <span>
                            <i className="mdi mdi-24px mdi-linkedin mdi-dark"></i>
                            {` `}
                            <a href={`https://www.linkedin.com/in/${social.linkedin}`}>{social.linkedin}</a>
                        </span>
                    </li>
                </ul>

            </div>
        </div>
    )
}

export default Profile
