import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import queryString from 'query-string'
import * as firebase from 'firebase/app'
import Layout from "../components/layout"
import 'firebase/auth'
import SEO from "../components/seo"

const Auth = ({ data, location }) => {
    const query = queryString.parse(location.search)
    const { provider } = query
    const siteTitle = data.site.siteMetadata.title
    const [user, setUser] = useState(null)

    useEffect(() => {
        const auth = firebase.auth()
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUser(user)
            if (user) {
                auth.signOut()
                return
            }
            window.opener.postMessage(`authorizing:${provider}`, '*')
            const provider = new firebase.auth.GithubAuthProvider()
            provider.addScope(query.scope)
            auth.signInWithRedirect(provider)
        })

        auth.getRedirectResult().then(result => {
            if (result.credential) {
                const token = result.credential.accessToken
                window.opener.postMessage(
                    `authorization:${provider}:success:${JSON.stringify({
                        provider,
                        token
                    })}`,
                    window.opener.origin
                )
            }

            if (result.user) {
                setUser(user)
            }
        }).catch(err => {
            const errorMessage = err.message
            window.opener.postMessage(
                `authorization:${provider}:error:${errorMessage}`,
                window.opener.origin
            )
        })

        return () => {
            unsubscribe()
        }
    }, [user])

    return (
        <Layout location={location} title={siteTitle}>
            <SEO title="Login" />
        </Layout>
    )
}

export default Auth

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
