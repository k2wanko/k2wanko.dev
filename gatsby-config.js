module.exports = {
  siteMetadata: {
    title: `コキチーズのホームページ`,
    author: {
      name: `コキチーズ`,
      summary: `千葉県で暮らすエンジニア`,
    },
    description: `コキチーズのホームページ`,
    siteUrl: `https://www.k2wanko.dev`,
    thumbnail: `/img/top.png`,
    social: {
      twitter: `k2wanko`,
      github: `k2wanko`,
      linkedin: `k2wanko`,
      twitch: `k2wanko`,
      youtube: {
        displayName: `コキっチゃんねる`,
        url: `https://www.youtube.com/channel/UCqXUdzIKLLsbi_w3qcYZilA`,
      }
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `コキチーズのホームページ`,
        short_name: `k2wanko's site`,
        start_url: `/`,
        background_color: `#5a9216`,
        theme_color: `#8bc34a`,
        display: `minimal-ui`,
        icon: `content/assets/icon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
        manualInit: true,
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `GEHQQNBHJP`,
        head: true,
      }
    }
  ],
}
