import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import path from 'path'

const SEO = ({ description, lang, meta, title, thumbnail, tags, sitePath }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            siteUrl
            description
            thumbnail
            social {
              twitter
            }
          }
        }
      }
    `
  )

  const { siteUrl } = site.siteMetadata

  let url
  if (!sitePath) {
    url = siteUrl
  } else {
    url = path.join(siteUrl, sitePath)
  }

  const metaDescription = description || site.siteMetadata.description
  thumbnail = thumbnail ?? site.siteMetadata.thumbnail
  if (thumbnail.startsWith('/')) {
    thumbnail = path.join(siteUrl, thumbnail)
  }

  if (!tags) {
    tags = ['website']
  }

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:type`,
          content: tags.join(','),
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:url`,
          content: url
        },
        {
          property: `og:image`,
          content: thumbnail
        },
        {
          property: `og:image:width`,
          content: `1280`,
        },
        {
          property: `og:image:alt`,
          content: title,
        },
        {
          property: `og:image:height`,
          content: `720`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.social.twitter,
        },
        {
          name: `twitter:site`,
          content: url,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `ja`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
