// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"

import "prismjs/themes/prism.css"


import firebaseConfig from './src/firebase-init.json'
import firebase from "firebase/app"
import "firebase/analytics"
import "first-input-delay"
import "firebase/performance"

firebase.initializeApp({
    ...firebaseConfig, ...{
        measurementId: 'G-GEHQQNBHJP' // k2wanko.dev
    }
})

const analytics = firebase.analytics()
firebase.performance()

export const onRouteUpdate = ({ location, prevLocation }) => {
    analytics.setCurrentScreen(location.pathname)
}