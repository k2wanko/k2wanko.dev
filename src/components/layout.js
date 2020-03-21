import React from "react"
import { Link } from "gatsby"
import * as firebase from 'firebase/app'
import { rhythm, scale } from "../utils/typography"

const firebaseConfig = {
  apiKey: "AIzaSyAZJjc21YxOR27-04FFRGAk2eqtqqpC5bM",
  authDomain: "k2wanko-site.firebaseapp.com",
  databaseURL: "https://k2wanko-site.firebaseio.com",
  projectId: "k2wanko-site",
  storageBucket: "k2wanko-site.appspot.com",
  messagingSenderId: "878455749238",
  appId: "1:878455749238:web:851b05503b61412496bd57"
}
firebase.initializeApp(firebaseConfig)

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  if (location.pathname === rootPath) {
    header = (
      <h1
        style={{
          ...scale(1.5),
          marginBottom: rhythm(1.5),
          marginTop: 0,
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
          {title}
        </Link>
      </h1>
    )
  } else {
    header = (
      <h3
        style={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
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
          {title}
        </Link>
      </h3>
    )
  }
  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <header>{header}</header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
