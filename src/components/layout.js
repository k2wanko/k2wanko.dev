import React from "react"
import { Link } from "gatsby"
import { rhythm } from "../utils/typography"
import "./layout.scss"

const Layout = ({ location, title, style, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  if (location.pathname !== rootPath) {
    header = (
      <h3
        className='subtitle'
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
      style={style || {
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      {header ? <header>{header}</header> : null}
      <main>{children}</main>
      {/* <footer>
        © {new Date().getFullYear()}
        {` `}
        <a href="https://www.k2wanko.dev">k2wanko</a>
      </footer> */}
    </div>
  )
}

export default Layout
