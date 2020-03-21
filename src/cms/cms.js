import CMS from "netlify-cms-app"

CMS.init({
  config: {
    backend: {
      base_url: window.location.origin,
    },
  },
})
