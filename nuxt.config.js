import pkg from './package'

export default {
  mode: 'universal',
  // router:{
  //   base:'/app/'
  // },

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no' },
      { name: 'HandheldFriendly', content: 'true' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
      { name: 'ormat-detection', content: 'telphone=no, email=no' },
      { name: 'screen-orientation', content: 'portrait' },
      { name: 'x5-orientation', content: 'portrait' },
      { name: 'full-screen', content: 'yes' },
      { name: 'x5-fullscreen', content: 'true' },
      { name: 'browsermode', content: 'application' },
      { name: 'x5-page-mode', content: 'app' },
      { name: 'msapplication-tap-highlight', content: 'no' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet',  href: '/style/common.css' },
      { rel: 'stylesheet',  href: '/style/animate.min.css' },
      { rel: 'stylesheet',  href: '/iconFont/iconfont.css' }
    ],
    script:[
      { src: '/js/rem.js' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#f60' },

  /*
  ** Global CSS
  */
  css: [
    'mint-ui/lib/style.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src:'@/plugins/mint-ui',ssr:true},
    {src:'@/plugins/router',ssr:true},
    {src:'@/config/util/filters',ssr:false}
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    proxy: true
  },
  proxy: [
    [
      '/api',
      {
        target:'https://www.hx2car.com.cn',
        // target:'http://www.2schome.net',
        pathRewrite: { '^/api' : '/' }
      }
    ]
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
